import { cache } from "react";
import CardForm from "@components/card-form";

// Force the page to render at request time (dynamic)
export const dynamic = "force-dynamic";

export default async function CreateCard() {
  // Fetch images from the API and cache them for an hour
  const fetchImages = cache(async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-card`,
      {
        headers: { "Cache-Control": "max-age=3600" },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await response.json();
    return data.images || [];
  });

  let images = [];
  try {
    images = await fetchImages();
  } catch (error) {
    console.error("Error fetching images:", error);
  }

  return (
    <div
      className="bg-cover flex flex-col justify-center items-center"
      style={{ backgroundImage: "url('/create-card-bg.png')", height: "100vh" }}
    >
      <CardForm images={images} />
    </div>
  );
}
