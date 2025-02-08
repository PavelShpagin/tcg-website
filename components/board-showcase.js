"use client";

import FlippableCard from "@/components/flip-card";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function BoardShowcase({ cardImages }) {
  const [revealedCards, setRevealedCards] = useState({
    bottomLeft: false,
    topRight: false,
    bottomRight: false,
    topLeft: false,
  });

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

      // 2. Reveal top right after revealDelay.
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

      // 4. Reveal top left after 3 * revealDelay.
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
  }, []);

  return (
    <div className="relative">
      {/* Top Row Cards */}
      <div className="flex justify-center gap-10 mb-8">
        {/* Top Left Card: flips to reveal card4 */}
        <FlippableCard
          backImage="/cardback-flipped.png"
          frontImage={cardImages.card4}
          isRevealed={revealedCards.topLeft}
          alt="Card Back"
        />
        {/* Top Right Card: flips to reveal card3 */}
        <FlippableCard
          backImage="/cardback-flipped.png"
          frontImage={cardImages.card3}
          isRevealed={revealedCards.topRight}
          alt="Card Back"
        />
      </div>

      {/* Board Delimiter */}
      <div className="flex justify-center my-8">
        <Image
          src="/board-delimiter.png"
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
          backImage="/cardback-normal.png"
          frontImage={cardImages.card1}
          isRevealed={revealedCards.bottomLeft}
          alt="Card Back"
        />
        {/* Bottom Right Card: flips to reveal card2 */}
        <FlippableCard
          backImage="/cardback-normal.png"
          frontImage={cardImages.card2}
          isRevealed={revealedCards.bottomRight}
          alt="Card Back"
        />
      </div>
    </div>
  );
}
