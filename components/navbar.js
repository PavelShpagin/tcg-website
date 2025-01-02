import Link from "next/link";
import Image from "next/image";
import { Button } from "@components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed z-40 top-8 mx-12 left-0 right-0 px-12 py-2 bg-black bg-opacity-20 backdrop-blur-xl rounded-full shadow-lg">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        <div className="flex items-center h-16">
          <Link href="/">
            <Image
              className="mr-4 hover:brightness-125 duration-200 ease-in-out"
              src="/logo.png"
              alt="Logo"
              width={130}
              height={33}
            />
          </Link>
        </div>
        <div className="flex items-center space-x-10">
          <Link
            href="/rules"
            className="text-gray-300 hover:bg-black hover:bg-opacity-25 hover:text-white px-5 py-3 rounded-full text-xl font-bold transition duration-200 ease-in-out"
          >
            Rules
          </Link>
          <Link
            href="/cards-official"
            className="text-gray-300 hover:bg-black hover:bg-opacity-25 hover:text-white px-5 py-3 rounded-full text-xl font-bold transition duration-200 ease-in-out"
          >
            Cards
          </Link>
          <Link
            href="/news"
            className="text-gray-300 hover:bg-black hover:bg-opacity-25 hover:text-white px-5 py-3 rounded-full text-xl font-bold transition duration-200 ease-in-out"
          >
            News
          </Link>
          <Link
            href="/community"
            className="text-gray-300 hover:bg-black hover:bg-opacity-25 hover:text-white px-5 py-3 rounded-full text-xl font-bold transition duration-200 ease-in-out"
          >
            Community
          </Link>
          <Link
            href="/create-card"
            className="text-gray-300 hover:bg-black hover:bg-opacity-25 hover:text-white px-5 py-3 rounded-full text-xl font-bold transition duration-200 ease-in-out"
          >
            Create
          </Link>
        </div>
        <div className="flex items-center">
          <Button
            size="lg"
            className="text-sm text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 font-bold py-3 px-6 transition duration-200 ease-in-out"
          >
            Log out
          </Button>
          <div className="ml-5">
            <svg
              className="h-8 w-8 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
