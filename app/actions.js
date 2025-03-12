"use server";

import { createClient } from "@/utils/supabase/server";
import { autofillPrompt, autofillPromptV2 } from "@/utils/autofill-prompt";
import { createHash } from "crypto";
import sharp from 'sharp';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper function to generate file hash
async function generateFileHash(buffer) {
  const hash = createHash('sha256');
  hash.update(buffer);
  return hash.digest('hex');
}

export async function loginWithDiscord() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
  });

  if (error) {
    throw new Error(error.message);
  }

  return data.url; // Return the URL to the client
}

// export async function queryApiWithUrl(cardData, imageUrl) {
//   console.log("Processing with URL:", imageUrl);

//   const prompt = autofillPrompt.replace("{input}", JSON.stringify(cardData, null, 2));
//   console.log(prompt);

//   const data = {
//     inputs: {
//       text: prompt,
//       images: imageUrl ? [imageUrl] : null,
//     },
//     parameters: {
//       max_new_tokens: 500,
//     },
//   };

//   try {
//     const response = await fetch("YOUR_API_ENDPOINT", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.YOUR_API_TOKEN}`,
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result = await response.json();
//     console.log("API call successful:", result);
//     return result;
//   } catch (error) {
//     console.error("Error querying API:", error);
//     return { error: "Failed to query API" };
//   }
// }

export async function queryApiWithFile(formData, modelType = 'openai') {
  const imageFile = formData.get('image');
  const cardData = JSON.parse(formData.get('cardData'));

  if (!imageFile) {
    return { error: "No image file provided" };
  }

  const supabase = createClient();

  // Process image and generate hash in parallel
  const originalBuffer = Buffer.from(await imageFile.arrayBuffer());
  const [resizedBuffer, fileHash] = await Promise.all([
    sharp(originalBuffer)
      .resize(200) // Reduced from 300px to 200px
      .jpeg({ quality: 80 }) // Add compression
      .toBuffer(),
    generateFileHash(originalBuffer)
  ]);

  const fileExtension = 'jpg'; // Force JPEG format
  const fileName = `${fileHash}.${fileExtension}`;

  // Start upload to Supabase storage
  const uploadPromise = supabase.storage
    .from('user-images')
    .upload(`upload-images/${fileName}`, resizedBuffer, {
      upsert: true,
      contentType: imageFile.type,
    });

  // Get public URL in parallel with upload
  const { data: { publicUrl } } = supabase.storage
    .from('user-images')
    .getPublicUrl(`upload-images/${fileName}`);

  // Wait for upload to complete
  const { error: uploadError } = await uploadPromise;
  if (uploadError) {
    console.error("Upload error:", uploadError);
    return { error: "Failed to upload image" };
  }

  // Prepare prompt
  const orderedCardData = {
    class: cardData.class || "",
    type: cardData.type || "",
    description: cardData.description || "",
    level: cardData.level || "",
    cost: cardData.cost || "",
    attack: cardData.attack || "",
    health: cardData.health || "",
  };

  const prompt = modelType === 'smolvlm' 
    ? "<image>" + autofillPrompt.replace("{input}", JSON.stringify(orderedCardData)).replace("[IMG]", "").replace("<s>", "").replace("[INST]", "")
    : autofillPrompt.replace("{input}", JSON.stringify(orderedCardData));

  // Optimize API calls
  try {
    let result;
    if (modelType === 'openai') {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        max_tokens: 500,
        messages: [{ 
          role: "user", 
          content: [
            { type: "text", text: prompt }, 
            { type: "image_url", image_url: { url: publicUrl } }
          ] 
        }],
      });
      result = response.choices[0].message.content;
    } else {
      const apiEndpoint = modelType === 'smolvlm'
        ? "https://wgz35ns80csvwttw.us-east-1.aws.endpoints.huggingface.cloud"
        : "https://gtll4aox1eqbmdq4.us-east4.gcp.endpoints.huggingface.cloud";

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        },
        body: JSON.stringify({
          inputs: { text: prompt, images: [publicUrl] },
          parameters: { max_new_tokens: 500 }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      result = jsonResponse[0].generated_text.split("[/INST]")[1].trim();
    }

    // Clean up the result
    let jsonOutput = result
      .replace(/^(Input:|Output:|\s*```json\s*)/g, '')
      .replace(/\s*```\s*$/g, '')
      .trim();

    return JSON.parse(jsonOutput);

  } catch (error) {
    console.error("Error in API call:", error);
    return { error: "Failed to process image" };
  }
}

//   // Make API call
//   try {
//     const response = await fetch("https://gtll4aox1eqbmdq4.us-east4.gcp.endpoints.huggingface.cloud", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.HF_TOKEN}`,
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result = await response.json();
//     let jsonOutput = result[0].generated_text.split("

//")[1].trim();
//     if (jsonOutput.startsWith("```json")) {
//       jsonOutput = jsonOutput.slice(7).trim();
//     }
//     if (jsonOutput.endsWith("```")) {
//       jsonOutput = jsonOutput.slice(0, -3).trim();
//     }
//     console.log("API call successful:", jsonOutput);
//     return JSON.parse(jsonOutput);
//   } catch (error) {
//     console.error("Error querying API:", error);
//     return { error: "Failed to query API" };
//   }
// }
