import Link from "next/link";
import Image from "next/image";
import AuthStatus from "./auth-status";

const Navbar = () => {
  return (
    <nav>
      <div className="max-w-8xl mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <Link href="/">
            <Image
              className="mr-4 brightness-[120%] hover:brightness-[140%] duration-200 ease-in-out"
              src="/logo.png"
              alt="Logo"
              width={130}
              height={33}
            />
          </Link>
        </div>
        <div className="flex-grow flex items-center justify-center space-x-4 md:space-x-6 lg:space-x-8">
          <Link href="/casters" className="navbar-link">
            Casters
          </Link>
          <Link href="/rules" className="navbar-link">
            Rules
          </Link>
          <Link href="/cards-official" className="navbar-link">
            Cards
          </Link>
          <Link href="/news" className="navbar-link">
            News
          </Link>
          <Link href="/community" className="navbar-link">
            Community
          </Link>
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
