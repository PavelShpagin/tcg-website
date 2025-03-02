import { cache } from "react";
import CardForm from "@components/card-form";

export default async function CreateCard() {
  // Fetch images from the API and cache them for an hour
  const fetchImages = cache(async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-card`
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
      className="bg-cover bg-fixed bg-center bg-[url('/create-card-bg.png')] flex flex-col justify-center items-center md:overflow-hidden md:h-screen"
    >
      <div className="fixed inset-0 bg-black/25 backdrop-blur-sm"></div>
      <CardForm images={images} />
    </div>
  );
}
