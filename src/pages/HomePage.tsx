import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import CategoryList from "../components/CategoryList";
import BottomNav from "../components/BottomNav";

const HomePage = () => {
  return (
    // Mobile-first container: full width on phones, capped and centered on
    // larger screens so the browser preview matches the real phone layout
    <div className="relative w-full max-w-md mx-auto bg-gradient-to-b from-stone-100 to-amber-100 min-h-screen shadow-xl">
      <Header />

      <main className="pb-28">
        {" "}
        {/* pb-20 adds space so content isn't hidden behind bottom nav */}
        <HeroSection />
        <CategoryList />
      </main>

      <BottomNav />
    </div>
  );
};

export default HomePage;
