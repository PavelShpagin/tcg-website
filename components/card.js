"use client";
import { useState } from "react";
import Image from "next/image";

export default function HoverCard() {
  // We'll track rotation in state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Mouse move handler
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    // Calculate x,y position relative to the center of the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;

    // Scale factors to control how "dramatic" the tilt is
    const rotateXCalc = ((y - halfHeight) / halfHeight) * 8;
    const rotateYCalc = ((x - halfWidth) / halfWidth) * 8;

    setRotateX(rotateXCalc);
    setRotateY(rotateYCalc);
  };

  // Reset on mouse leave so the card goes back to normal
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      {/* Container that provides perspective */}
      <div className="relative w-64 h-96 perspective-1000">
        {/* The actual card that rotates */}
        <div
          className={`
            w-full h-full
            transition-transform duration-300
            transform-gpu
            rounded-xl overflow-hidden
            shadow-xl hover:shadow-2xl
            border border-gray-700
          `}
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src="/path-to-your-card-image.jpg"
            alt="Card"
            fill // fill the parent container
            className="object-cover pointer-events-none select-none"
          />
        </div>
      </div>
    </div>
  );
}
