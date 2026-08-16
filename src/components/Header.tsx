import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

const Header = () => {
  // Track scroll position so the header can blend over the hero at the top
  // and become a solid bar once you scroll past it (for readability).
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Language switch state. Supports French and Arabic.
  const { language, toggleLanguage } = useLanguage();

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
        <div className="flex items-center gap-1">
          {/* Notifications bell — links to the notifications page */}
          <button
            onClick={() => navigate("/notifications")}
            aria-label="Notifications"
            className={`p-2 transition-colors duration-300 active:scale-90 ${
              scrolled ? "text-stone-600" : "text-white"
            }`}
          >
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          {/* Language switch — French / Arabic. Toggles the label only for now. */}
          <button
            onClick={toggleLanguage}
            aria-label="Switch language"
            className={`px-2.5 py-1.5 rounded-full text-xs font-bold transition-colors duration-300 active:scale-90 ${
              scrolled
                ? "bg-stone-100 text-stone-700 hover:bg-stone-200"
                : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
            }`}
          >
            {language === "fr" ? "FR" : "ع"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
