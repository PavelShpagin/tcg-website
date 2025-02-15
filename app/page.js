import Link from "next/link";
import Image from "next/image";
import { Button } from "@components/ui/button";
import { IM_Fell_English } from "next/font/google";
import { FaDiscord } from "react-icons/fa";
import { cn } from "@/lib/utils";
import ShowcaseCards from "@components/showcase-cards";
import ShowcaseRules from "@components/showcase-rules";
import Footer from "@/components/footer";

const font = IM_Fell_English({
  weight: ["400"],
  subsets: ["latin"],
});

export default async function Home() {
  return (
    <>
      <div
        className="bg-cover flex flex-col items-center overflow-x-hidden h-[1800px-100vh]"
        style={{
          backgroundImage: "url(/home-bg-full.png)",
        }}
      >
        <Image
          className="absolute mt-[160px] lg:mt-[calc(33.333vh-100px)] z-0 w-[400px] lg:w-[600px] h-auto max-w-[800px]"
          src="/logo-full.svg"
          width={800}
          height={800}
          alt="Logo Full"
          priority
        />
        <div className="z-10 flex flex-col items-center max-w-[90%]">
          <div className="mt-[350px] lg:mt-[calc(66.666vh-100px)] text-center">
            <h2
              className={cn(
                font.className,
                "text-[30px]/[30px] lg:text-[38px]/[33px] text-white mt-16 font-bold drop-shadow-main"
              )}
            >
              Armies, Bosses, Mindgames
            </h2>
            <h2
              className={cn(
                font.className,
                "text-[30px]/[30px] lg:text-[38px]/[33px] text-white mt-5 font-bold drop-shadow-main"
              )}
            >
              Next gen collectable card game
            </h2>
          </div>
          <h2
            className={cn(
              font.className,
              "text-[20px]/[20px] lg:text-[24px]/[24px] text-gray-300 mt-8 font-bold drop-shadow-2xl tracking-wider"
            )}
          >
            Welcome to Our Community
          </h2>
          <Link href="https://discord.gg/rvGwTmjw" className="mt-8">
            <Button className="button-purple">
              <FaDiscord className="mr-2" />
              Join Discord
            </Button>
          </Link>
        </div>
        <ShowcaseCards />
        <ShowcaseRules />
      </div>
      <Footer />
    </>
  );
}
