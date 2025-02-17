"use client";

import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { Button } from "@components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCardsOpen, setIsCardsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCards = () => {
    setIsCardsOpen(!isCardsOpen);
  };

  return (
    <>
      <Drawer open={isOpen} onClose={toggleMenu}>
        <DrawerTrigger asChild>
          <Button onClick={toggleMenu}>
            <RxHamburgerMenu className="h-8 w-8" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col">
          <DrawerHeader className="flex justify-center items-center p-4 w-80">
            <DrawerClose asChild>
              <Button className="button-login !px-[0.5px] !py-[0.5px] absolute top-[10px] left-[10px]">
                <IoCloseOutline className="h-10 w-10" />
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Link href="/">
                <Image
                  className="mr-4 brightness-[120%] hover:brightness-[140%] duration-200 ease-in-out w-130"
                  src="/logo.png"
                  alt="Logo"
                  width={130}
                  height={33}
                />
              </Link>
            </DrawerClose>
          </DrawerHeader>
          <Link href="/rules" className="navbar-link">
            Rules
          </Link>
          <div className="flex flex-col">
            <button 
              onClick={toggleCards}
              className="navbar-link flex items-center"
            >
              Cards
              <svg
                className={`w-4 h-4 transition-transform duration-200 ml-2 ${
                  isCardsOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isCardsOpen && (
              <div className="flex flex-col pl-4">
                <Link href="/cards/official" className="navbar-link">
                  Official
                </Link>
                <Link href="/cards/custom" className="navbar-link">
                  Custom
                </Link>
              </div>
            )}
          </div>
          {/* <Link href="/news" className="navbar-link">
            News
          </Link> */}
          {/* <Link href="/products" className="navbar-link">
            Products
          </Link> */}
          <Link href="/create-card" className="navbar-link">
            Create
          </Link>
        </DrawerContent>

        {/*}
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-bold">Menu</h2>
          <Button onClick={toggleMenu}>
            <IoCloseOutline className="h-8 w-8" />
          </Button>
        </div>
        <nav className="flex flex-col p-4">
          <Link href="/" className="navbar-link">
            Home
          </Link>
          <Link href="/about" className="navbar-link">
            About
          </Link>
          <Link href="/services" className="navbar-link">
            Services
          </Link>
          <Link href="/contact" className="navbar-link">
            Contact
          </Link>
        </nav>
        */}
      </Drawer>
    </>
  );
}
