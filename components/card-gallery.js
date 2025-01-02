"use client";
import { useState } from "react";
import Image from "next/image";
import SelectedCard from "./selected-card";

export default function CardGallery({ cards }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-filter backdrop-blur-xl overflow-auto">
        <h1 className="text-4xl font-bold text-white text-center pt-36 pb-8">
          Card Gallery
        </h1>
        <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-transparent rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer"
              onClick={() => openModal(card.card_img)}
            >
              <Image
                src={card.card_img}
                alt={`Card image ${index + 1}`}
                width={300}
                height={400}
                className="w-full h-auto object-cover"
                style={{ userSelect: "none" }}
              />
            </div>
          ))}
        </div>
      </div>
      <SelectedCard selectedImage={selectedImage} onClose={closeModal} />
    </>
  );
}
