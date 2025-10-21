import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { DarkModeToggle } from "./DarkModeToggle";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm z-20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <NavLink to="/" label="Home" />
            <NavLink to="/popular" label="Popular Dupes" />
            <NavLink to="/blog" label="Blog" />
            <NavLink to="/about" label="About" />
          </nav>
          <DarkModeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center md:hidden gap-3">
          <DarkModeToggle />
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-accent transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`transition-all duration-200 ease-out md:hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        } bg-background border-t border-border`}
      >
        <nav className="flex flex-col items-start p-4 space-y-4">
          <NavLink to="/" label="Home" onClick={closeMenu} />
          <NavLink to="/popular" label="Popular Dupes" onClick={closeMenu} />
          <NavLink to="/blog" label="Blog" onClick={closeMenu} />
          <NavLink to="/about" label="About" onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
}
