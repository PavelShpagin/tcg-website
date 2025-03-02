import { Button } from "@/components/ui/button";
import Link from "next/link";
import BoardShowcase from "@/components/board-showcase";

export default function ShowcaseRules() {
  return (
    <section className="bg-[var(--showcase-bg)] w-full bg-opacity-60">
      <div className="gray-delimiter" />
      <div className="w-full mx-auto py-12 px-4 lg:px-8">
        {/* Header Section */}
        <div className="text-center py-4">
          <h2 className="text-4xl font-bold text-white">Dive into Casters</h2>
          <p className="mt-2 text-lg text-gray-300">
            Get a quick taste of the rules
          </p>
          <div className="flex items-center justify-center mt-6">
            <div className="mx-4 text-gray-500 uppercase tracking-widest text-sm">
              Overview
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto mt-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Side - Cards and Delimiter */}
            <div className="lg:w-1/2 relative group">
              <BoardShowcase
                cardImages={{
                  card1: `/card1.png`, //${process.env.NEXT_PUBLIC_BASE_URL}
                  card2: `/card2.png`, //${process.env.NEXT_PUBLIC_BASE_URL}
                  card3: `/card3.png`, //${process.env.NEXT_PUBLIC_BASE_URL}
                  card4: `/card4.png`, //${process.env.NEXT_PUBLIC_BASE_URL}
                }}
              />
            </div>

            {/* Right Side - Text Content */}
            <div className="lg:w-1/2 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-white">
                  Simple Steps, Epic Strategy
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Shuffle, draw five cards, and reveal your Stage to set the
                  tone of battle. Decide initiative and set cards in parallel
                  with your opponent. It&apos;s time to outsmart and combo out
                  your opponent.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-3" />
                  <p className="text-gray-300">
                    Both players set cards in parallel. Reveal one by one.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-3" />
                  <p className="text-gray-300">
                    Dynamic and unpredictable gameplay.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-3" />
                  <p className="text-gray-300">
                    Wealth of card combinations and strategies.
                  </p>
                </div>
              </div>

              {/* Button */}
              <div className="pt-6">
                <Link href="/rules">
                  <Button className="button-login">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
