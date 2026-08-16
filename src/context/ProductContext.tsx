import React, { createContext, useContext, useState } from "react";
import { products as seedProducts, type Product } from "../data/products";

interface ProductContextValue {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: number, product: Omit<Product, "id">) => void;
  deleteProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextValue | null>(null);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  // Seed with the mock products. New products are added to state only
  // (not persisted yet).
  const [products, setProducts] = useState<Product[]>(seedProducts);

  const addProduct = (product: Omit<Product, "id">) => {
    setProducts((prev) => {
      const nextId = prev.reduce((max, p) => Math.max(max, p.id), 0) + 1;
      return [...prev, { ...product, id: nextId }];
    });
  };

  const updateProduct = (id: number, product: Omit<Product, "id">) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...product, id } : p))
    );
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};