import React, { useState, useEffect } from "react";

const Header = () => {
  // Track scroll position so the header can blend over the hero at the top
  // and become a solid bar once you scroll past it (for readability).
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Transparent over the hero, solid once scrolled past it
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-stone-50/90 backdrop-blur-md border-b border-stone-200"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-5 py-4">
        {/* Brand badge — always visible over any hero image */}
        <h1
          className={`px-3 py-1.5 rounded-full font-display font-bold tracking-tight transition-colors duration-300 ${
            scrolled
              ? "bg-amber-700 text-white"
              : "bg-black/40 text-white backdrop-blur-sm"
          }`}
        >
          CoffeeFlow
        </h1>
        <button
          aria-label="Search"
          className={`p-2 transition-colors duration-300 active:scale-90 ${
            scrolled ? "text-stone-600" : "text-white"
          }`}
        >
          {/* Search Icon SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
