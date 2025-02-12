"use client";
import React, { useState } from "react";
import Image from "next/image";
import SelectedCard from "./selected-card";

const CardGallery = ({ cards = [], title = "Card Gallery" }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  return (
    <>
      {/* Semi-transparent overlay to darken the background */}
      <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />

      <div className="flex flex-col items-center w-full mx-auto z-10">
        <h1
          className="text-5xl md:text-6xl font-extrabold text-center text-white drop-shadow-lg mt-16 mb-12 mt-44"
          style={{ fontFamily: "Ingra, sans-serif" }}
        >
          {title}
        </h1>
        <div className="gray-delimiter z-10 w-full mt-8"></div>

        {/* Glassmorphic container */}
        <div className="flex items-center justify-center bg-[var(--showcase-bg)] bg-opacity-60 shadow-lg w-full z-10 py-16 min-h-[70vh]">
          {cards.length === 0 ? (
            <p className="italic text-white text-lg">Yet to create...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.02]"
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
          )}
        </div>
      </div>

      <SelectedCard selectedImage={selectedImage} onClose={closeModal} />
    </>
  );
};

export default CardGallery;
