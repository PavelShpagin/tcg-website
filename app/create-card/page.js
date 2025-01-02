import { cache } from "react";
import CardForm from "@components/card-form";

export default async function CreateCard() {
  // Fetch images from the API and cache them for an hour
  const fetchImages = cache(async () => {
    const response = await fetch("http://localhost:3000/api/create-card", {
      headers: { "Cache-Control": "max-age=3600" },
    });
    const data = await response.json();
    return data.images || [];
  });

  const images = await fetchImages();

  return (
    <div
      className="bg-cover flex flex-col justify-center items-center"
      style={{ backgroundImage: "url('/create-card-bg.png')", height: "100vh" }}
    >
      <CardForm images={images} />
    </div>
  );
}
