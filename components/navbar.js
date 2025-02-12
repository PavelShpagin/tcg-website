import Link from "next/link";
import Image from "next/image";
import AuthStatus from "./auth-status";
import MobileMenu from "./mobile-menu";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="max-w-8xl flex items-center justify-between">
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
        <div className="items-center justify-center xl:space-x-4 hidden md:flex">
          <Link href="/rules" className="navbar-link">
            Rules
          </Link>

          {/* Dropdown for Cards triggered on hover */}
          <div className="relative group">
            <button className="navbar-link flex items-center">
              <span>Cards</span>
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 w-40 rounded-xl shadow-lg bg-[var(--background)] border-[3px] border-[var(--border)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50 custom-blur-bg">
              <Link
                href="/cards/official"
                className="block px-4 py-2 navbar-link text-center"
              >
                Official
              </Link>
              <Link
                href="/cards/custom"
                className="block px-4 py-2 navbar-link text-center"
              >
                Custom
              </Link>
            </div>
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
        </div>
        <div className="flex items-center justify-end w-32">
          <AuthStatus />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
