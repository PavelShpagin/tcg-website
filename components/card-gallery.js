"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import SelectedCard from "./selected-card";

const CardGallery = ({ cards = [] }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="backdrop-blur-md">
        <h1 className="pt-44 pb-6 text-6xl font-bold text-center mb-8 drop-shadow-main">
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
                width={736}
                height={1000}
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
};

export default CardGallery;
