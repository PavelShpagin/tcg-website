"use client";

import { useEffect } from "react";

const shuffleArray = (array) => {
  let shuffledArray = [];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    shuffledArray.push(array[j]);
    array.splice(j, 1);
  }
  return shuffledArray;
};

export default function ImagePreloader() {
  useEffect(() => {
    const loadImages = async () => {
      // Skip if already cached
      if (sessionStorage.getItem("cardImages")) {
        return;
      }

      try {
        const response = await fetch("/api/card-images");
        const data = await response.json();
        if (data.images) {
          const shuffledImages = shuffleArray(data.images);
          sessionStorage.setItem("cardImages", JSON.stringify(shuffledImages));
          sessionStorage.setItem("currentImageIndex", 0);
          console.log("Images cached in sessionStorage");
        }
      } catch (error) {
        console.error("Failed to cache images:", error);
      }
    };

    loadImages();
  }, []);

  return null; // This component doesn't render anything
}
