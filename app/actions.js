"use server";

import { createClient } from "@/utils/supabase/server";
import { autofillPrompt, autofillPromptV2 } from "@/utils/autofill-prompt";
import { createHash } from "crypto";

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

export async function queryApiWithFile(formData) {
  const imageFile = formData.get('image');
  const cardData = JSON.parse(formData.get('cardData'));

  if (!imageFile) {
    return { error: "No image file provided" };
  }

  const supabase = createClient();
  
  // Generate hash for file name
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const fileHash = await generateFileHash(buffer);
  const fileExtension = imageFile.name.split('.').pop();
  const fileName = `${fileHash}.${fileExtension}`;

  // Upload to Supabase storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('user-images')
    .upload(`upload-images/${fileName}`, buffer, {
      upsert: true,
      contentType: imageFile.type,
    });

  if (uploadError) {
    console.error("Error uploading to Supabase:", uploadError);
    return { error: "Failed to upload image" };
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('user-images')
    .getPublicUrl(`upload-images/${fileName}`);

  // Reorder cardData fields to match the prompt structure
  const orderedCardData = {
    class: cardData.class || "",
    type: cardData.type || "",
    description: cardData.description || "",
    level: cardData.level || "",
    cost: cardData.cost || "",
    attack: cardData.attack || "",
    health: cardData.health || "",
  };

  // Prepare prompt and data for API call
  const prompt = autofillPrompt.replace("{input}", JSON.stringify(orderedCardData, null, 2));
  const data = {
    inputs: {
      text: prompt,
      images: publicUrl ? [publicUrl] : null,
    },
    parameters: {
      max_new_tokens: 500,
    },
  };
  // Add retry logic for API calls
  const maxRetries = 8;
  const retryDelay = 10000; // 10 seconds between retries
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch("https://n5ae8q97e483iws9.us-east-1.aws.endpoints.huggingface.cloud", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        let jsonOutput = result[0].generated_text.split("[/INST]")[1].trim();
        if (jsonOutput.startsWith("```json")) {
          jsonOutput = jsonOutput.slice(7).trim();
        }
        if (jsonOutput.endsWith("```")) {
          jsonOutput = jsonOutput.slice(0, -3).trim();
        }
        console.log("API call successful:", jsonOutput);
        return JSON.parse(jsonOutput);
      }

      if (attempt < maxRetries) {
        console.log(`Attempt ${attempt} failed, retrying in ${retryDelay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }

    } catch (error) {
      if (attempt < maxRetries) {
        console.log(`Attempt ${attempt} failed with error: ${error.message}`);
        console.log(`Retrying in ${retryDelay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      } else {
        console.error("All retry attempts failed:", error);
        return { error: "Failed to query API after multiple attempts" };
      }
    }
  }


  // Make API call
  try {
    const response = await fetch("https://gtll4aox1eqbmdq4.us-east4.gcp.endpoints.huggingface.cloud", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    let jsonOutput = result[0].generated_text.split("[/INST]")[1].trim();
    if (jsonOutput.startsWith("```json")) {
      jsonOutput = jsonOutput.slice(7).trim();
    }
    if (jsonOutput.endsWith("```")) {
      jsonOutput = jsonOutput.slice(0, -3).trim();
    }
    console.log("API call successful:", jsonOutput);
    return JSON.parse(jsonOutput);
  } catch (error) {
    console.error("Error querying API:", error);
    return { error: "Failed to query API" };
  }
}
