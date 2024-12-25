"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Card } from "@components/card";

export default function Gallery() {
  const [cards, setCards] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await axios.get("/api/cards-official");
        console.log(response.data);
        setCards(response.data);
      } catch (error) {
        console.error("Failed to fetch cards", error);
      }
    }

    fetchCards();
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="relative bg-cover min-h-screen"
      style={{
        backgroundImage: "url('/cards-official-bg.png')",
      }}
    >
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

      {/* Modal for viewing images */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="bg-transparent">
            <Image
              src={selectedImage}
              alt="Selected Card"
              width={500}
              height={675}
              className="cursor-pointer shadow-2xl rounded-lg"
              style={{ userSelect: "none" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
