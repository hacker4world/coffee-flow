import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart, MAX_QUANTITY } from "../context/CartContext";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { addItem } = useCart();

  const product = products.find((p) => p.id === Number(productId));

  // Selected option per variant group, keyed by group name.
  const [selectedOptions, setSelectedOptions] = useState({});
  // Quantity stepper state.
  const [quantity, setQuantity] = useState(1);
  // Feedback state after adding to cart.
  const [added, setAdded] = useState(false);
  // Optional note from the user.
  const [note, setNote] = useState("");

  if (!product) {
    return (
      <div className="relative w-full max-w-md mx-auto bg-stone-100 min-h-screen flex flex-col items-center justify-center px-6">
        <p className="text-stone-600 mb-4">Product not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-full bg-amber-700 text-white font-semibold"
        >
          Go back
        </button>
      </div>
    );
  }

  // Default selection: first option of each variant group.
  const defaultOptions = {};
  product.variants?.forEach((group) => {
    defaultOptions[group.name] = group.options[0].id;
  });

  const effectiveOptions = { ...defaultOptions, ...selectedOptions };

  // Compute the unit price: base price + deltas of the selected options.
  const unitPrice = product.variants
    ? product.variants.reduce((sum, group) => {
        const optId = effectiveOptions[group.name];
        const opt = group.options.find((o) => o.id === optId);
        return sum + (opt ? opt.priceDelta : 0);
      }, product.price)
    : product.price;

  const subtotal = unitPrice * quantity;

  const handleAdd = () => {
    addItem(product, effectiveOptions, quantity, note.trim() || undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="relative w-full max-w-md mx-auto bg-gradient-to-b from-stone-100 to-amber-100 min-h-screen shadow-xl">
      {/* Image hero with back button */}
      <div className="relative h-72">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="absolute top-4 left-4 p-2 rounded-full bg-black/40 text-white backdrop-blur-sm active:scale-90 transition-transform"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* Info + variants */}
      <div className="px-5 py-5 pb-32">
        {/* Category chip + name */}
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
            {product.categoryId === 1
              ? "☕ Espresso"
              : product.categoryId === 2
              ? "🧊 Cold Brew"
              : "🍵 Tea"}
          </span>
        </div>
        <h1 className="text-2xl font-display font-bold text-stone-800 tracking-tight mt-2">
          {product.name}
        </h1>
        <p className="text-stone-500 mt-1 leading-relaxed">
          {product.description}
        </p>

        {/* Price card */}
        <div className="mt-4 bg-white rounded-2xl shadow-sm ring-1 ring-stone-100 px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-stone-500">Unit price</span>
          <span className="text-amber-700 font-bold text-xl">
            {unitPrice.toFixed(2)} TND
          </span>
        </div>

        {/* Variant groups */}
        {product.variants?.map((group) => (
          <div key={group.name} className="mt-6">
            <h3 className="text-sm font-semibold text-stone-700 mb-2">
              {group.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.options.map((option) => {
                const isSelected = effectiveOptions[group.name] === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [group.name]: option.id,
                      }))
                    }
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      isSelected
                        ? "bg-amber-700 text-white shadow-md shadow-amber-700/30"
                        : "bg-white text-stone-600 ring-1 ring-stone-200 hover:ring-amber-300"
                    }`}
                  >
                    {option.name}
                    {option.priceDelta > 0 && (
                      <span
                        className={`ml-1 text-xs ${
                          isSelected ? "text-amber-100" : "text-amber-700"
                        }`}
                      >
                        +{option.priceDelta.toFixed(2)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Further details note */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-stone-700 mb-2">
            Further details
          </h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Any special requests? e.g. extra hot, less ice, no foam..."
            rows={3}
            className="w-full bg-white rounded-2xl ring-1 ring-stone-200 p-3 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
          />
        </div>
      </div>

      {/* Sticky add-to-order bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-md mx-auto bg-white border-t border-stone-200 px-5 py-4 flex items-center gap-4">
          {/* Quantity stepper */}
          <div className="flex items-center gap-3 bg-stone-100 rounded-full px-2 py-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="h-8 w-8 rounded-full bg-white text-stone-700 flex items-center justify-center active:scale-90 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
            </button>
            <span className="w-6 text-center font-bold text-stone-800">
              {quantity}
            </span>
            <button
              onClick={() =>
                setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))
              }
              aria-label="Increase quantity"
              className="h-8 w-8 rounded-full bg-white text-stone-700 flex items-center justify-center active:scale-90 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Add button */}
          <button
            onClick={handleAdd}
            className={`flex-1 py-3 rounded-full font-bold text-white transition-colors ${
              added ? "bg-green-600" : "bg-amber-700"
            }`}
          >
            {added ? "Added ✓" : `Add to Order · ${subtotal.toFixed(2)} TND`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
