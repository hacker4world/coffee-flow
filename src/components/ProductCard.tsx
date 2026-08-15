import React from "react";

// Reusable product card. Renders either a horizontal list row ("list") or a
// vertical card ("grid") depending on the `variant` prop.
const ProductCard = ({ product, variant = "list" }) => {
  const addButton = (
    <button
      aria-label={`Add ${product.name} to order`}
      className="h-9 w-9 rounded-full bg-amber-700 text-white flex items-center justify-center active:scale-90 transition-transform flex-shrink-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  );

  if (variant === "grid") {
    return (
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-stone-100 active:scale-[0.98] transition-transform">
        {/* Image fills the top of the card */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-36 object-cover"
        />
        {/* Floating add button over the image */}
        <div className="absolute top-2 right-2">{addButton}</div>

        {/* Text content */}
        <div className="p-3">
          <h3 className="font-display font-bold text-stone-800 tracking-tight leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-stone-500 mt-1 line-clamp-2">
            {product.description}
          </p>
          <p className="text-amber-700 font-bold mt-2">
            {product.price.toFixed(2)} TND
          </p>
        </div>
      </div>
    );
  }

  // Default: horizontal list row
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm ring-1 ring-stone-100">
      <img
        src={product.image}
        alt={product.name}
        className="h-20 w-20 rounded-xl object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-bold text-stone-800 tracking-tight">
          {product.name}
        </h3>
        <p className="text-xs text-stone-500 mt-0.5 line-clamp-2">
          {product.description}
        </p>
        <p className="text-amber-700 font-bold mt-1">
          {product.price.toFixed(2)} TND
        </p>
      </div>
      {addButton}
    </div>
  );
};

export default ProductCard;
