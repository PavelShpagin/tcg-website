import Link from "next/link";
import Image from "next/image";
import AuthStatus from "./auth-status";
import MobileMenu from "./mobile-menu";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        <div className="flex md:hidden">
          <MobileMenu />
        </div>
        <div className="flex items-center justify-start w-32 ml-12 md:ml-0">
          <Link href="/">
            <Image
              className="mr-4 brightness-[120%] hover:brightness-[140%] duration-200 ease-in-out w-[100px] min-w-[100px] xl:w-[130px] xl:min-w-[130px]"
              src="/logo.png"
              alt="Logo"
              width={130}
              height={33}
            />
          </Link>
        </div>
        <div className="flex-grow items-center justify-center xl:space-x-4 hidden md:flex">
          <Link href="/rules" className="navbar-link">
            Rules
          </Link>
          <Link href="/cards-official" className="navbar-link">
            Cards
          </Link>
          {/* <Link href="/news" className="navbar-link">
            News
          </Link> */}
          {/* <Link href="/products" className="navbar-link">
            Products
          </Link> */}
          <Link href="/create-card" className="navbar-link">
            Create
          </Link>
        </div>
        <div className="flex items-center justify-end w-32">
          <AuthStatus />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
