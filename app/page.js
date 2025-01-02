import Link from "next/link";
import Image from "next/image";
import ButtonPurple from "@components/button-purple";
import { IM_Fell_English } from "next/font/google";
import { FaDiscord } from "react-icons/fa";

const font = IM_Fell_English({
  weight: ["400"],
  subsets: ["latin"],
});

export default async function Home() {
  return (
    <div
      className="bg-cover flex flex-col items-center overflow-x-hidden max-w-full"
      style={{
        backgroundImage: "url(/home-bg.png)",
        height: "1800px",
      }}
    >
      <Image
        className="absolute mt-36 z-0"
        src="/logo-full.svg"
        width={800}
        height={800}
        alt="Logo Full"
        priority
      />
      <div className="mt-80 z-10 flex flex-col items-center">
        <div className="mt-32 text-center">
          <h2
            className={`${font.className} text-6xl text-white mt-16 font-bold`}
            style={{
              textShadow: `
              1px 1px 2px #696969,   /* dim gray */
              1px 1px 10px #708090,  /* slate gray */
              1px 1px 18px #2F4F4F,  /* dark slate gray */
              1px 1px 25px #000000   /* black */
            `,
            }}
          >
            Armies, Bosses, Mindgames
          </h2>
          <h2
            className={`${font.className} text-6xl text-white mt-5 font-bold`}
            style={{
              textShadow: `
              1px 1px 2px #696969,   /* dim gray */
              1px 1px 10px #708090,  /* slate gray */
              1px 1px 18px #2F4F4F,  /* dark slate gray */
              1px 1px 25px #000000   /* black */
            `,
            }}
          >
            Next gen collectable card game
          </h2>
        </div>
        <h2
          className={`${font.className} text-4xl text-gray-300 mt-8 font-bold drop-shadow-2xl tracking-wider`}
        >
          Welcome to Our Community
        </h2>

        <Link href="https://discord.gg/yourdiscordlink" className="mt-8">
          <ButtonPurple>
            <FaDiscord className="mr-2" />
            Join Discord
          </ButtonPurple>
        </Link>
      </div>
    </div>
  );
}
