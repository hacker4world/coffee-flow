import React, { createContext, useContext, useState } from "react";

// Maximum quantity allowed for a single cart line item.
export const MAX_QUANTITY = 10;

// A single line item in the cart. `selectedOptions` maps a variant group name
// to the chosen option id (e.g. { Size: "large", Milk: "oat" }).
export interface CartItem {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    variants?: {
      name: string;
      options: { id: string; name: string; priceDelta: number }[];
    }[];
  };
  selectedOptions: Record<string, string>;
  quantity: number;
  note?: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (
    product: CartItem["product"],
    selectedOptions: Record<string, string>,
    quantity?: number,
    note?: string
  ) => void;
  updateQuantity: (index: number, quantity: number) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Add a product (with its selected variant options and quantity) to the cart.
  // If an identical line (same product + same options) already exists, its
  // quantity is increased instead of adding a duplicate line.
  const addItem = (
    product: CartItem["product"],
    selectedOptions: Record<string, string>,
    quantity = 1,
    note?: string
  ) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          JSON.stringify(item.selectedOptions) ===
            JSON.stringify(selectedOptions)
      );

      if (existingIndex !== -1) {
        return prev.map((item, index) =>
          index === existingIndex
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, MAX_QUANTITY),
                note: note ?? item.note,
              }
            : item
        );
      }

      return [...prev, { product, selectedOptions, quantity, note }];
    });
  };

  // Update the quantity of a line item (clamped to [1, MAX_QUANTITY]).
  const updateQuantity = (index: number, quantity: number) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.min(Math.max(quantity, 1), MAX_QUANTITY) }
          : item
      )
    );
  };

  // Remove a line item by its index.
  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear the entire cart.
  const clearCart = () => setItems([]);

  // Total number of items across all lines (sum of quantities).
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Total price of the cart in TND.
  const totalPrice = items.reduce((sum, item) => {
    const base = item.product.price;
    const deltas = Object.values(item.selectedOptions).reduce((acc, optId) => {
      const delta = item.product.variants
        ?.flatMap((group) => group.options)
        .find((opt) => opt.id === optId)?.priceDelta;
      return acc + (delta || 0);
    }, 0);
    return sum + (base + deltas) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
