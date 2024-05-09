import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data: classes } = await supabase.from("class").select();
  console.log(classes);

  return (
    <div
      className="h-screen w-full bg-cover flex flex-col items-center justify-start pt-20"
      style={{
        backgroundImage: "url(/home-bg.png)",
        height: "1000px",
      }}
    >
      <Image
        className="mt-32"
        src="/logo-full.png"
        width={800}
        height={800}
        alt="Logo Full"
        priority
      />
      <h2 className="text-4xl text-white mt-14 font-bold drop-shadow-lg tracking-widest">
        Welcome to Our Community
      </h2>
      <Link
        href="https://discord.gg/yourdiscordlink"
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-200 ease-in-out shadow-lg hover:shadow-xl"
      >
        Join Discord
      </Link>
    </div>
  );
}
