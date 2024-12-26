import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const imageCache = new Map();

export async function fetchRandomImage() {
  if (imageCache.size > 0) {
    // 25% chance to use cached image
    if (Math.random() < 0.25) {
      const cachedImages = Array.from(imageCache.values());
      return cachedImages[Math.floor(Math.random() * cachedImages.length)];
    }
  }

  const response = await fetch("/api/random-image");
  const data = await response.json();

  if (!data.error) {
    imageCache.set(data.imageUrl, data);
    // Keep cache size reasonable
    if (imageCache.size > 20) {
      const firstKey = imageCache.keys().next().value;
      imageCache.delete(firstKey);
    }
  }

  return data;
}
