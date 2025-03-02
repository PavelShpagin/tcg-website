"use client";

import { useAnimate } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function FlippableCard({
  backImage,
  frontImage,
  isRevealed,
  width = 150,
  height = 209,
  alt = "",
}) {
  const [scope, animate] = useAnimate();
  const [displayFront, setDisplayFront] = useState(false);

  useEffect(() => {
    if (scope.current) {
      // When isRevealed becomes true, run the slower open (flip) animation.
      if (isRevealed && !displayFront) {
        (async () => {
          // Animate to 90deg
          await animate(
            scope.current,
            { transform: "rotateY(90deg)" },
            { duration: 0.6 }
          );
          // Swap image to front
          setDisplayFront(true);
          // Immediately set to -90deg to prep for flip-in animation
          scope.current.style.transform = "rotateY(-90deg)";
          // Animate back to 0deg
          await animate(
            scope.current,
            { transform: "rotateY(0deg)" },
            { duration: 0.6 }
          );
        })();
      }
      // When isRevealed becomes false, run the closing flip animation.
      else if (!isRevealed && displayFront) {
        (async () => {
          // Animate to 90deg
          await animate(
            scope.current,
            { transform: "rotateY(90deg)" },
            { duration: 0.6 }
          );
          // Swap image back to card back
          setDisplayFront(false);
          // Immediately set to -90deg to prep for flip-in animation
          scope.current.style.transform = "rotateY(-90deg)";
          // Animate back to 0deg
          await animate(
            scope.current,
            { transform: "rotateY(0deg)" },
            { duration: 0.6 }
          );
        })();
      }
    }
  }, [isRevealed, displayFront, animate, scope]);

  return (
    <div ref={scope} style={{ perspective: 1000 }} className="inline-block">
      <div className="w-[150px] h-[209px] hover:scale-[1.02] transition-transform duration-300">
        <Image
          src={`${displayFront ? frontImage : backImage}`}
          alt={alt}
          width={width}
          height={height}
          className="rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
}
