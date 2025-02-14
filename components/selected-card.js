"use client";
import Image from "next/image";

export default function SelectedCard({ selectedImage, onClose }) {
  if (!selectedImage) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center h-[100vh] z-[1000]"
      onClick={onClose}
    >
      <div className="bg-transparent z-40">
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
  );
}
