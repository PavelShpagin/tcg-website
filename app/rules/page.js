import Image from "next/image";

export default function Rules() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white p-8 bg-fixed bg-no-repeat bg-center"
      style={{
        backgroundImage: "url('/rules-bg.png')",
      }}
    >
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto space-y-16 backdrop-blur-sm">
        {/* Header */}
        <h1 className="text-5xl font-bold text-center mb-12 drop-shadow-main">
          Game Rules
        </h1>

        {/* Card Explanation */}
        <section className="space-y-6 bg-[#1216227a] rounded-2xl p-8 border border-[rgba(243,244,246,0.15)] shadow-2xl backdrop-blur-md">
          <h2 className="text-3xl font-semibold border-b border-gray-700/50 pb-4">
            Card Structure
          </h2>
          <div className="flex gap-12 items-center">
            <Image
              src="/rules-card.png"
              alt="Card explanation"
              width={300}
              height={420}
              className="rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
            />
            <div className="space-y-4">
              <p className="text-gray-300 text-lg">
                Each card contains the following elements:
              </p>
              <ul className="space-y-3 text-gray-200">
                <li>Class: Defines the card's color identity</li>
                <li>Type: Minion, Spell, or Stage</li>
                <li>Description: Card's special abilities</li>
                <li>Level: Power level (Minions only)</li>
                <li>Cost: Resources needed to play</li>
                <li>Attack/Health: Combat stats (Minions only)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Card Types */}
        <section className="space-y-6 bg-[#1216227a] rounded-2xl p-8 border border-[rgba(243,244,246,0.15)] shadow-2xl backdrop-blur-md">
          <h2 className="text-3xl font-semibold border-b border-gray-700/50 pb-4">
            Card Types
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {["Minion", "Spell", "Stage"].map((type) => (
              <div
                key={type}
                className="group space-y-4 hover:transform hover:scale-105 transition-all duration-300"
              >
                <Image
                  src={`/${type.toLowerCase()}-card.png`}
                  alt={`${type} card`}
                  width={200}
                  height={280}
                  className="rounded-xl shadow-2xl group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                />
                <div className="space-y-2 p-4 bg-black/20 rounded-xl">
                  <h3 className="text-xl font-medium">{type}</h3>
                  <p className="text-sm text-gray-300">
                    {type === "Minion"
                      ? "Creatures that fight for you with Attack and Health stats"
                      : type === "Spell"
                        ? "One-time effects that can change the course of battle"
                        : "Represents player health and unlocks card placement slots"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Game Board */}
        <section className="space-y-6 bg-[#1216227a] rounded-2xl p-8 border border-[rgba(243,244,246,0.15)] shadow-2xl backdrop-blur-md">
          <h2 className="text-3xl font-semibold border-b border-gray-700/50 pb-4">
            Game Board
          </h2>
          <Image
            src="/board.png"
            alt="Game board layout"
            width={800}
            height={400}
            className="rounded-xl shadow-2xl hover:scale-[1.02] transition-transform duration-300"
          />
          <div className="grid grid-cols-2 gap-12 mt-8">
            {["Setup", "Turn Structure"].map((section) => (
              <div key={section} className="bg-black/20 p-6 rounded-xl">
                <h3 className="text-2xl font-medium mb-4">{section}</h3>
                <ul className="space-y-2 text-gray-300">
                  {section === "Setup" ? (
                    <>
                      <li>
                        Each player brings a 30-card main deck (max 2 copies
                        each)
                      </li>
                      <li>5-card stage deck (max 1 copy each)</li>
                      <li>Start with 5 cards in hand</li>
                      <li>Initiative determined by coin flip</li>
                    </>
                  ) : (
                    <>
                      <li>Draw Phase: Draw a card</li>
                      <li>Set Phase: Place cards face-down</li>
                      <li>Reveal Phase: Activate or discard for 2 cards</li>
                      <li>Battle Phase: Attack with minions</li>
                      <li>End Phase: Pass initiative</li>
                    </>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
