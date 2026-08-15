import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart, MAX_QUANTITY } from "../context/CartContext";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const { addItem, updateItem, items } = useCart();

  const product = products.find((p) => p.id === Number(productId));

  // Determine which cart line (if any) this product maps to for editing.
  // Priority: an explicit `edit` query param, otherwise the first cart line
  // that matches this product (so re-entering from the list page edits it).
  const editParam = searchParams.get("edit");
  const productCartIndex = items.findIndex(
    (item) => item.product.id === Number(productId)
  );
  const editingIndex =
    editParam !== null
      ? Number(editParam)
      : productCartIndex !== -1
      ? productCartIndex
      : null;
  const editingItem = editingIndex !== null ? items[editingIndex] : undefined;

  // Selected option per variant group, keyed by group name.
  const [selectedOptions, setSelectedOptions] = useState({});
  // Quantity stepper state.
  const [quantity, setQuantity] = useState(1);
  // Feedback state after adding to cart.
  const [added, setAdded] = useState(false);
  // Optional note from the user.
  const [note, setNote] = useState("");

  // Carousel state for the product image gallery.
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // When editing an existing cart line, pre-populate the form with its values.
  useEffect(() => {
    if (editingItem) {
      setSelectedOptions(editingItem.selectedOptions);
      setQuantity(editingItem.quantity);
      setNote(editingItem.note ?? "");
    }
  }, [editingItem]);

  const handleDragStart = (clientX) => {
    startX.current = clientX;
    setIsDragging(true);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    setDragOffset(clientX - startX.current);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const containerWidth = containerRef.current
      ? containerRef.current.offsetWidth
      : 0;
    const threshold = containerWidth / 4;

    if (dragOffset < -threshold && currentIndex < gallery.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (dragOffset > threshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
    setDragOffset(0);
  };

  const transformValue = `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`;

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

  // Build a small gallery of images for the product (its own image + a couple
  // of related coffee shots) so the carousel has multiple slides.
  const gallery = [
    product.image,
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1442975631115-c4f7b05b8a2c?auto=format&fit=crop&w=1200&q=80",
  ];

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
    if (editingItem && editingIndex !== null) {
      updateItem(
        editingIndex,
        effectiveOptions,
        quantity,
        note.trim() || undefined
      );
      // Return to the order page after updating.
      navigate("/cart");
      return;
    }
    addItem(product, effectiveOptions, quantity, note.trim() || undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="relative w-full max-w-md mx-auto bg-gradient-to-b from-stone-100 to-amber-100 min-h-screen shadow-xl">
      {/* Image carousel with back button */}
      <div
        ref={containerRef}
        className="relative h-64 overflow-hidden select-none cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        <div
          className="flex h-full"
          style={{
            transform: transformValue,
            transition: isDragging ? "none" : "transform 0.5s ease-out",
          }}
        >
          {gallery.map((image, index) => (
            <div
              key={index}
              className="shrink-0 w-full h-full relative pointer-events-none"
            >
              <img
                src={image}
                alt={`${product.name} view ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20"></div>
            </div>
          ))}
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate("/menu")}
          aria-label="Go back to menu"
          className="absolute top-4 left-4 p-2 rounded-full bg-black/40 text-white backdrop-blur-sm active:scale-90 transition-transform z-10"
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

        {/* Category badge top-right */}
        <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold z-10">
          {product.categoryId === 1
            ? "☕ Espresso"
            : product.categoryId === 2
            ? "🧊 Cold Brew"
            : "🍵 Tea"}
        </span>

        {/* In-cart indicator */}
        {editingItem && (
          <span className="absolute top-4 left-16 px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-semibold z-10 shadow-md">
            ✓ In cart
          </span>
        )}

        {/* Product name badge at the bottom of the image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <span className="inline-block bg-white/95 backdrop-blur-md rounded-full px-4 py-1.5 shadow-lg">
            <span className="text-base font-display font-bold text-stone-800 tracking-tight">
              {product.name}
            </span>
          </span>
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-3 right-4 z-10 flex items-center gap-1.5">
          {gallery.map((_, index) => (
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

      {/* Info + variants */}
      <div className="px-5 py-5 pb-32">
        {/* Description card */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-stone-100 px-4 py-3">
          <div className="flex items-center gap-2 mb-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-amber-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wide text-stone-400">
              Description
            </span>
          </div>
          <p className="text-stone-600 leading-relaxed text-sm">
            {product.description}
          </p>
        </div>

        {/* Price card */}
        <div className="mt-3 bg-white rounded-2xl shadow-sm ring-1 ring-stone-100 px-4 py-3 flex items-center justify-between">
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
        <div className="max-w-md mx-auto bg-white border-t border-stone-200 px-4 py-3 flex items-center gap-3">
          {/* Quantity stepper */}
          <div className="flex items-center gap-2 bg-stone-100 rounded-full px-1.5 py-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="h-7 w-7 rounded-full bg-white text-stone-700 flex items-center justify-center active:scale-90 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
            </button>
            <span className="w-5 text-center font-bold text-stone-800 text-sm">
              {quantity}
            </span>
            <button
              onClick={() =>
                setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))
              }
              aria-label="Increase quantity"
              className="h-7 w-7 rounded-full bg-white text-stone-700 flex items-center justify-center active:scale-90 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Add / Update button */}
          <button
            onClick={handleAdd}
            className={`flex-1 py-2.5 rounded-full font-bold text-sm text-white transition-colors ${
              added ? "bg-green-600" : "bg-amber-700"
            }`}
          >
            {editingItem
              ? `Update Order · ${subtotal.toFixed(2)} TND`
              : added
              ? "Added ✓"
              : `Add to Order · ${subtotal.toFixed(2)} TND`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
