"use client";

import FlippableCard from "@/components/flip-card";
import Image from "next/image";
import { useState, useEffect } from "react";

// Helper component that preloads an array of image URLs
function PreloadImages({ images }) {
  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image(); 
      img.src = src;
    });
  }, [images]);
  return null;
}

export default function BoardShowcase({ cardImages }) {
  const [revealedCards, setRevealedCards] = useState({
    bottomLeft: false,
    topRight: false,
    bottomRight: false,
    topLeft: false,
  });

  // Array of all image URLs that need preloading.
  const preloadedImages = [
    cardImages.card1,
    cardImages.card2,
    cardImages.card3,
    cardImages.card4,
    `/board-delimiter.png`,//${process.env.NEXT_PUBLIC_BASE_URL}
    `/cardback-flipped.png`,//${process.env.NEXT_PUBLIC_BASE_URL}
    `/cardback-normal.png`,//${process.env.NEXT_PUBLIC_BASE_URL}
  ];

  useEffect(() => {
    const timeouts = [];
    // Timing constants (in milliseconds)
    const revealDelay = 2000; // delay between each card reveal
    const holdDuration = 4000; // how long to keep all cards revealed after the last flip
    const cycleDuration = revealDelay * 3 + holdDuration + 1000; // total cycle duration

    function startCycle() {
      // Reset all cards to closed at the start of the cycle.
      setRevealedCards({
        bottomLeft: false,
        topRight: false,
        bottomRight: false,
        topLeft: false,
      });

      // Reveal cards in sequence:
      // 1. Reveal bottom left immediately.
      timeouts.push(
        setTimeout(() => {
          setRevealedCards((prev) => ({ ...prev, bottomLeft: true }));
        }, 0)
      );

      // 2. Reveal top left after revealDelay.
      timeouts.push(
        setTimeout(() => {
          setRevealedCards((prev) => ({ ...prev, topLeft: true }));
        }, revealDelay)
      );

      // 3. Reveal bottom right after 2 * revealDelay.
      timeouts.push(
        setTimeout(() => {
          setRevealedCards((prev) => ({ ...prev, bottomRight: true }));
        }, revealDelay * 2)
      );

      // 4. Reveal top right after 3 * revealDelay.
      timeouts.push(
        setTimeout(() => {
          setRevealedCards((prev) => ({ ...prev, topRight: true }));
        }, revealDelay * 3)
      );

      // After holding the last card open for a few seconds, close all cards.
      timeouts.push(
        setTimeout(
          () => {
            setRevealedCards({
              bottomLeft: false,
              topRight: false,
              bottomRight: false,
              topLeft: false,
            });
          },
          revealDelay * 3 + holdDuration
        )
      );

      // Schedule the next cycle.
      timeouts.push(setTimeout(startCycle, cycleDuration));
    }

    startCycle();

    // Cleanup timeouts on component unmount.
    return () => timeouts.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <>
      {/* Preload images on page load */}
      <PreloadImages images={preloadedImages} />
      <div className="relative">
        {/* Top Row Cards */}
        <div className="flex justify-center gap-10 mb-8">
          {/* Top Left Card: flips to reveal card4 */}
          <FlippableCard
            backImage={`/cardback-flipped.png`} //${process.env.NEXT_PUBLIC_BASE_URL}
            frontImage={cardImages.card4}
            isRevealed={revealedCards.topLeft}
            alt="Card Back"
          />
          {/* Top Right Card: flips to reveal card3 */}
          <FlippableCard
            backImage={`/cardback-flipped.png`} //${process.env.NEXT_PUBLIC_BASE_URL}
            frontImage={cardImages.card3}
            isRevealed={revealedCards.topRight}
            alt="Card Back"
          />
        </div>

        {/* Board Delimiter */}
        <div className="flex justify-center my-8">
          <Image
            src={`/board-delimiter.png`} //${process.env.NEXT_PUBLIC_BASE_URL}
            alt="Board Delimiter"
            width={340}
            height={20}
            className="opacity-80"
          />
        </div>

        {/* Bottom Row Cards */}
        <div className="flex justify-center gap-10 mt-4">
          {/* Bottom Left Card: flips to reveal card1 */}
          <FlippableCard
            backImage={`/cardback-normal.png`} //${process.env.NEXT_PUBLIC_BASE_URL}
            frontImage={cardImages.card1}
            isRevealed={revealedCards.bottomLeft}
            alt="Card Back"
          />
          {/* Bottom Right Card: flips to reveal card2 */}
          <FlippableCard
            backImage={`/cardback-normal.png`} //${process.env.NEXT_PUBLIC_BASE_URL}
            frontImage={cardImages.card2}
            isRevealed={revealedCards.bottomRight}
            alt="Card Back"
          />
        </div>
      </div>
    </>
  );
}
