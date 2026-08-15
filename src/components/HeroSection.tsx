import React, { useState, useEffect, useRef } from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    title: "Good Morning",
    subtitle: "Brewed fresh daily since 2024",
  },
  {
    image:
      "https://images.unsplash.com/photo-1442975631115-c4f7b05b8a2c?auto=format&fit=crop&w=1200&q=80",
    title: "Artisanal Craft",
    subtitle: "Precision in every pour",
  },
  {
    image:
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1200&q=80",
    title: "Ethically Sourced",
    subtitle: "From farm to your glass",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0); // Tracks live finger/mouse movement in pixels
  const [isDragging, setIsDragging] = useState(false);

  const startX = useRef(0);
  const containerRef = useRef<HTMLElement | null>(null);

  // Auto-play effect (pauses automatically if isDragging is true)
  useEffect(() => {
    if (isDragging) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentIndex, isDragging]);

  // --- Unified Drag/Touch Handlers ---

  const handleDragStart = (clientX) => {
    startX.current = clientX;
    setIsDragging(true);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const delta = clientX - startX.current;
    setDragOffset(delta);
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    // Get container width to calculate snap threshold
    const containerWidth = containerRef.current
      ? containerRef.current.offsetWidth
      : 0;
    const threshold = containerWidth / 4; // Require 25% drag to change slide

    if (dragOffset < -threshold && currentIndex < slides.length - 1) {
      // Dragged left -> Next slide
      setCurrentIndex((prev) => prev + 1);
    } else if (dragOffset > threshold && currentIndex > 0) {
      // Dragged right -> Previous slide
      setCurrentIndex((prev) => prev - 1);
    }

    // Reset offset to 0 so the CSS transform snaps to the current index
    setDragOffset(0);
  };

  // Calculate the dynamic transform value
  const transformValue = `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[32vh] min-h-[220px] -mt-20 overflow-hidden select-none cursor-grab active:cursor-grabbing"
      // Mouse events for desktop testing
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      // Touch events for mobile
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
    >
      <div
        className="flex h-full"
        style={{
          transform: transformValue,
          // Disable transition while dragging for 1:1 finger movement, enable for snapping
          transition: isDragging ? "none" : "transform 0.5s ease-out",
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="shrink-0 w-full h-full relative pointer-events-none"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
              draggable="false"
            />
            {/* Top gradient so the header/badge area always has a dark backdrop */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            <div className="relative h-full flex flex-col justify-end p-5 pb-8">
              <h2
                key={index}
                className="text-3xl font-display font-bold text-white tracking-tight animate-[fadeUp_0.5s_ease-out]"
              >
                {slide.title}
              </h2>
              <p className="text-stone-200 mt-1 text-sm font-medium">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        <span className="text-white/70 text-xs font-medium">
          {currentIndex + 1} / {slides.length}
        </span>
        <div className="flex space-x-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === index ? "w-4 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-3 right-4 z-10 animate-bounce">
        <svg
          className="h-5 w-5 text-white/80"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
