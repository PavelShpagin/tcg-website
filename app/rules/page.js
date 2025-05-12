"use client";

import Image from "next/image";
import BoardShowcase from "@/components/board-showcase";
import { FaExclamationCircle, FaExclamationTriangle } from "react-icons/fa";
import Footer from "@/components/footer";

// Important Component
const Important = ({ children }) => (
  <div className="bg-red-900 text-red-300 p-4 flex rounded bg-opacity-60">
    <FaExclamationCircle className="mt-1 mr-2" />
    <span>{children}</span>
  </div>
);

// Note Component
const Note = ({ children }) => (
  <div className="bg-green-900 text-green-300 p-4 flex rounded bg-opacity-60">
    <FaExclamationTriangle className="mt-1 mr-2" />
    <span>{children}</span>
  </div>
);

export default function Rules() {
  // Images to be passed into the BoardShowcase (rules1: board components visual)

  const quality = 1.5;

  const boardCardImages = {
    card1: "/card1.png",
    card2: "/card2.png",
    card3: "/card3.png",
    card4: "/card4.png",
  };

  // Delimiter component with updated styling to match the theme
  const Delimiter = () => (
    <div className="h-0.5 bg-zinc-600/60 w-full my-4 z-10" />
  );

  return (
    <>
      <div className="bg-fixed bg-cover bg-center bg-[url('/cards-official-bg.png')]">
        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm"></div>
        <div className="flex flex-col items-center z-10">
          <h1
            className="text-5xl md:text-6xl font-extrabold text-center text-white drop-shadow-lg mt-16 mb-12 mt-44"
            style={{ fontFamily: "Ingra, sans-serif" }}
          >
            Rules
          </h1>
          <div className="gray-delimiter z-10 w-full mt-8"></div>
          <div className="w-full bg-[var(--showcase-bg)] bg-opacity-80 z-10 pb-12 px-4">
            <div className="max-w-5xl mx-auto space-y-12 mt-12">
              {/* Game Overview */}
              <div className="bg-zinc-700/40 p-6 md:p-8 rounded-xl shadow-lg border border-zinc-600">
                <section id="overview">
                  <h2
                    className="text-4xl font-bold mb-4 text-center"
                    style={{ fontFamily: "Ingra, sans-serif" }}
                  >
                    Game Overview
                  </h2>
                  <p className="text-lg text-center">
                    Welcome to Casters, an immersive fantasy Trading Card Game
                    where two players engage in strategic combat. Victory is
                    achieved through masterful summoning of minions, tactical
                    spell casting, and skillful prediction of your
                    opponent&apos;s moves.
                  </p>
                </section>
              </div>
              {/* 1. Card Structure */}
              <div className="bg-zinc-700/40 p-6 md:p-8 rounded-xl shadow-lg border border-zinc-600">
                <section
                  id="card-structure"
                  className="flex flex-col items-center"
                >
                  <h2
                    className="text-4xl font-bold mb-4 text-center"
                    style={{ fontFamily: "Ingra, sans-serif" }}
                  >
                    Card Structure
                  </h2>
                  <div className="flex flex-col md:flex-row py-8 gap-8 justify-center items-center">
                    <Image
                      src={`/rules-card.png`} // ${process.env.NEXT_PUBLIC_BASE_URL}
                      alt="Card Structure"
                      width={300 * quality}
                      height={420 * quality}
                      className="w-[250px] md:w-[300px]"
                    />
                    <div className="px-4 md:px-0">
                      <div className="space-y-2 mb-4">
                        <p>
                          <strong className="red-box">Level:</strong> Indicates
                          the card&apos;s strength.
                        </p>
                        <p>
                          <strong className="red-box">Cost:</strong> What is
                          required to cast or play the card.
                        </p>
                        <p>
                          <strong className="red-box">Effect:</strong>{" "}
                          Card&apos;s special abilities.
                        </p>
                        <p>
                          <strong className="red-box">Attack/Health:</strong>{" "}
                          Combat stats for Minions.
                        </p>
                        <p>
                          <strong className="red-box">Class:</strong> Is defined
                          by the color of the card.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              {/* 2. Card Types */}
              <div className="bg-zinc-700/40 p-6 md:p-8 rounded-xl shadow-lg border border-zinc-600">
                <section id="card-types">
                  <h2
                    className="text-4xl font-bold mb-4 text-center"
                    style={{ fontFamily: "Ingra, sans-serif" }}
                  >
                    Card Types
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
                    {[
                      {
                        type: "Minion",
                        image:
                          "https://fkmywxxthxwsyjqngcgn.supabase.co/storage/v1/object/public/official-images/card-images/12be8bba-636c-4b85-9db0-3a807981a767.webp",
                        description:
                          "Summons a minion with Attack and Health stats and a unique effect.",
                      },
                      {
                        type: "Spell",
                        image:
                          "https://fkmywxxthxwsyjqngcgn.supabase.co/storage/v1/object/public/official-images/card-images/57650af0-dbbe-4e37-ab62-c4dfcf7cf5d0.webp",
                        description:
                          "Unleashes powerful one-time effects and is moved to the Graveyard (GY) after use.",
                      },
                      {
                        type: "Stage",
                        image:
                          "https://fkmywxxthxwsyjqngcgn.supabase.co/storage/v1/object/public/official-images/card-images/5a963f00-c936-401b-9b2b-c5029bb8cdf4.webp",
                        description:
                          "Represents your hero's health (each equals 5 health) and limits the number of cards you can set.",
                      },
                    ].map((card) => (
                      <div
                        key={card.type}
                        className="flex flex-col items-center"
                      >
                        <Image
                          src={card.image}
                          alt={`${card.type} Card`}
                          width={200 * quality}
                          height={280 * quality}
                          className="rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300 w-[200px]"
                        />
                        <h3 className="text-xl mt-2 red-box">{card.type}</h3>
                        <p className="text-sm text-gray-300 text-center">
                          {card.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              {/* 3. Game Board */}
              <div className="bg-zinc-700/40 p-6 md:p-8 rounded-xl shadow-lg border border-zinc-600">
                <section id="game-board" className="flex flex-col items-center">
                  <h2
                    className="text-4xl font-bold mb-4 text-center"
                    style={{ fontFamily: "Ingra" }}
                  >
                    Game Board
                  </h2>
                  <p className="text-lg mb-4 text-center">
                    The game board has these zones for each player:
                  </p>
                  <div className="flex flex-col gap-2 mb-4">
                    <p>
                      <strong className="red-box">Main Deck:</strong> Your
                      30-card deck (only Minions and Spells).
                    </p>
                    <p>
                      <strong className="red-box">Stage Deck:</strong> A deck of
                      5 Stage cards, representing 25 total health.
                    </p>
                    <p>
                      <strong className="red-box">Graveyard (GY) (GY):</strong>{" "}
                      Where discarded and destroyed cards go.
                    </p>
                    <p>
                      <strong className="red-box">Coin:</strong> Determines
                      initiative - first player gets 1 coin.
                    </p>
                  </div>
                  <div className="flex flex-col items-center pt-8 pb-4">
                    <Image
                      src={`/rules1.png`} // ${process.env.NEXT_PUBLIC_BASE_URL}
                      alt="Game Board"
                      width={600 * quality}
                      height={300 * quality}
                      className="w-[600px]"
                    />
                  </div>
                </section>
              </div>
              {/* 4. Before the Game */}
              <div className="bg-zinc-700/40 p-6 md:p-8 rounded-xl shadow-lg border border-zinc-600">
                <section
                  id="before-game"
                  className="flex flex-col items-center"
                >
                  <h2
                    className="text-4xl font-bold mb-4 text-center"
                    style={{ fontFamily: "Ingra" }}
                  >
                    Before the Game
                  </h2>
                  <p className="text-lg mb-4">
                    Prior to starting, players must complete a few setup steps:
                  </p>
                  <ul className="list-disc ml-6 space-y-1 mb-4">
                    <li>
                      <strong>Decide Initiative:</strong> Flip a coin. The
                      player with the first initiative gets one coin.
                    </li>
                    <li>
                      <strong>Shuffle & Reveal Stage Card:</strong> Each player
                      shuffles their decks and reveals one card from their Stage
                      deck, paying its cost.
                    </li>
                    <li>
                      <strong>Draw 5 Cards:</strong> Begin with 5 cards drawn
                      from your Main deck.
                    </li>
                  </ul>
                  <div className="flex justify-center">
                    <Image
                      src={`/rules2.png`} // ${process.env.NEXT_PUBLIC_BASE_URL}
                      alt="Before the Game"
                      width={440 * quality}
                      height={220 * quality}
                      className="w-[440px]"
                    />
                  </div>
                </section>
                <Note>
                  Note: If you can&apos;t pay for a Stage card, keep revealing
                  until you find one you can afford. Shuffle any other revealed
                  cards back into your Stage deck.
                </Note>
              </div>
              {/* 5. Turn Cycle */}
              {/* Main wrapper for Turn Cycle including End of Turn */}
              <div className="bg-zinc-700/40 p-6 md:p-8 rounded-xl shadow-lg border border-zinc-600">
                <section id="turn-cycle" className="flex flex-col items-center">
                  <h2
                    className="text-4xl font-bold mb-4 text-center"
                    style={{ fontFamily: "Ingra" }}
                  >
                    Turn Cycle
                  </h2>

                  <p className="text-lg mb-6 text-center">
                    Turns are shared between both players, meaning they draw,
                    set, reveal cards, and attack on the same turn.
                  </p>

                  <Delimiter />

                  {/* Draw Phase */}
                  <div className="mt-2 mb-6 w-full">
                    <h2
                      className="text-2xl font-semibold mb-4 text-center mt-8"
                      style={{ fontFamily: "Ingra" }}
                    >
                      Draw Phase
                    </h2>
                    <p className="text-lg text-center">
                      At the start of the turn, each player draws one card from
                      their Main deck and untaps all of their cards.
                    </p>
                  </div>
                  <Delimiter />

                  {/* Set Phase */}
                  <div className="mb-6 w-full">
                    <h2
                      className="text-2xl font-semibold mb-4 text-center mt-8"
                      style={{ fontFamily: "Ingra" }}
                    >
                      Set Phase
                    </h2>
                    <p className="text-lg text-center">
                      Each player sets a number of cards face-down equal to the
                      total number of Stage cards on the board (including yours
                      and opponent&apos;s). Both players can set their cards at
                      the same time.
                    </p>
                    <div className="flex justify-center mt-4">
                      <Image
                        src={`/rules3.png`} // ${process.env.NEXT_PUBLIC_BASE_URL}
                        alt="Set Phase"
                        width={480 * quality}
                        height={240 * quality}
                        className="w-[480px]"
                      />
                    </div>
                  </div>
                  <Delimiter />

                  {/* Reveal Phase */}
                  <div className="mb-6 w-full">
                    <h2
                      className="text-2xl font-semibold mb-4 text-center mt-8"
                      style={{ fontFamily: "Ingra" }}
                    >
                      Reveal Phase
                    </h2>
                    <p className="text-lg mb-4 text-center">
                      The player with initiative reveals one facedown card, then
                      the other player reveals one facedown card. Players
                      alternate revealing cards until all facedown cards have
                      been revealed. On reveal, player chooses one of two
                      options:
                    </p>
                    <div className="mb-4">
                      <p className="text-lg text-center">
                        <strong>Option 1:</strong> Play the revealed card by
                        paying its cost.
                      </p>
                      <div className="flex justify-center mt-2">
                        <Image
                          src={`/rules41.png`} // ${process.env.NEXT_PUBLIC_BASE_URL}
                          alt="Play Card (Rules41)"
                          width={450 * quality}
                          height={300 * quality}
                          className="w-[450px]"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-lg text-center">
                        <strong>Option 2:</strong> Send the card to your
                        Graveyard (GY) and draw 2 new cards.
                      </p>
                      <div className="flex justify-center mt-2">
                        <Image
                          src={`/rules43.png`} // ${process.env.NEXT_PUBLIC_BASE_URL}
                          alt="Discard for Draw (Rules43)"
                          width={450 * quality}
                          height={300 * quality}
                          className="w-[450px]"
                        />
                      </div>
                    </div>
                  </div>
                  <section id="notes" className="space-y-4 mb-4">
                    <Important>
                      Important: When multiple cards activate simultaneously,
                      the player with first initiative resolves all effects
                      first, followed by the second player.
                    </Important>
                    <Note>
                      Note: If a card is activated while another has &quot;When
                      a card activates...&quot;, it may trigger in response on
                      the stack regardless of initiative. When no abilities are
                      activated, the stack resolves in last-to-first order.
                    </Note>
                  </section>
                  <Delimiter />

                  {/* Battle Phase */}
                  <div className="w-full">
                    <h2
                      className="text-2xl font-semibold mb-4 text-center mt-8"
                      style={{ fontFamily: "Ingra" }}
                    >
                      Battle Phase
                    </h2>
                    <p className="text-lg mb-4 text-center font-medium text-gray-300 drop-shadow-md">
                      The player with initiative may choose to attack with only
                      one of their minions or skip the attack.
                    </p>
                    <div className="flex items-center justify-center mb-4">
                      <div className="h-0.5 w-16 bg-zinc-600/60 mr-4"></div>
                      <p className="text-lg text-center font-medium text-gray-300 drop-shadow-md">
                        If the player chooses to attack with a minion, they can
                        choose one of the following options:
                      </p>
                      <div className="h-0.5 w-16 bg-zinc-600/60 ml-4"></div>
                    </div>
                    <ul className="list-disc ml-6 space-y-1 mb-4">
                      <li>
                        Attack your opponent&apos;s Hero (by targeting their
                        Stage deck). The opponent may tap any of their untapped
                        minions to block (they choose the order).
                      </li>
                      <li>Attack an opponent&apos;s tapped minion.</li>
                    </ul>
                    <p className="text-lg mb-4 text-center">
                      Next, the other player can attack in the same way. If both
                      players skip, the Battle Phase ends.
                    </p>
                    <div className="flex justify-center">
                      <Image
                        src={`/rules5.png`} // ${process.env.NEXT_PUBLIC_BASE_URL}
                        alt="Battle Phase (Rules5)"
                        width={440 * quality}
                        height={220 * quality}
                        className="w-[440px]"
                      />
                    </div>
                  </div>
                  <section id="notes" className="space-y-4 mt-4 mb-4">
                    <Important>
                      Important: Damage dealt to minions and Stages is restored
                      at the end of turn. (Stage cards do not return back to the
                      deck)
                    </Important>
                    <Note>
                      Note: Players who skip their attack can still attack after
                      their opponent attacks.
                    </Note>
                    <Note>
                      Note: When attacking a Hero, excess damage beyond blocking
                      minions&apos; health is dealt to the Hero. When attacking
                      a minion, excess damage is not transferred to the Hero.
                    </Note>
                  </section>
                </section>

                {/* 6. End of Turn (Moved inside Turn Cycle Box) */}
                <Delimiter />
                <div
                  id="end-turn"
                  className="flex flex-col items-center mt-8 w-full"
                >
                  <h2
                    className="text-2xl font-semibold mb-4 text-center"
                    style={{ fontFamily: "Ingra" }}
                  >
                    End of Turn
                  </h2>
                  <p className="text-lg text-center">
                    At the end of the turn, the player with initiative passes
                    the coin to the opponent to change the initiative, and the
                    turn ends.
                  </p>
                </div>
              </div>{" "}
              {/* End Turn Cycle Box */}
              {/* 7. Win Condition */}
              <div className="bg-zinc-700/40 p-6 md:p-8 rounded-xl shadow-lg border border-zinc-600">
                <section
                  id="win-condition"
                  className="flex flex-col items-center"
                >
                  <h2
                    className="text-4xl font-bold mb-4 text-center"
                    style={{ fontFamily: "Ingra" }}
                  >
                    Win Condition
                  </h2>
                  <p className="text-lg text-center">
                    The game is won when the other player loses all their Stage
                    cards.
                  </p>
                </section>
              </div>
              {/* Keyword Explanations */}
              <div className="bg-zinc-700/40 p-6 md:p-8 rounded-xl shadow-lg border border-zinc-600">
                <section id="keywords" className="flex flex-col items-center">
                  <h2
                    className="text-4xl font-bold mb-4 text-center"
                    style={{ fontFamily: "Ingra" }}
                  >
                    Keyword Explanations
                  </h2>
                  <div className="flex flex-col space-y-2">
                    <div>
                      <strong className="red-box">Sacrifice:</strong> Send a
                      card from your field to your Graveyard (GY) to pay a cost
                      or trigger an effect.
                    </div>
                    <div>
                      <strong className="red-box">Discard:</strong> Send a card
                      from your hand to your Graveyard (GY).
                    </div>
                    <div>
                      <strong className="red-box">Search:</strong> Search your
                      deck for a specific card, reveal it, and add it to your
                      hand.
                    </div>
                    <div>
                      <strong className="red-box">Negate:</strong> Cancel or
                      nullify another card&apos;s effect.
                    </div>
                    <div>
                      <strong className="red-box">Death:</strong> When a minion
                      is sent from the field to the Graveyard (GY).
                    </div>
                    <div>
                      <strong className="red-box">Shield:</strong> A card from
                      the top of your deck is placed face-down under another
                      card. When the minion would take damage, this shield is
                      removed and returned to the top of your deck.
                    </div>
                    <div>
                      <strong className="red-box">Equip:</strong> Attach a card
                      to a minion to apply the effects. When equipping a minion,
                      both stats and effects are enhanced; with spells, only the
                      &quot;Equip:&quot; effect applies.
                    </div>
                    <div>
                      <strong className="red-box">Double Strike:</strong> The
                      first time a minion attacks, it untaps, allowing for a
                      potential second attack.
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
