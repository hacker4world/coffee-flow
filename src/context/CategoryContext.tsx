import React, { createContext, useContext, useState } from "react";
import { categories as seedCategories, type Category } from "../data/coffeeData";

interface CategoryContextValue {
  categories: Category[];
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (id: number, category: Omit<Category, "id">) => void;
  deleteCategory: (id: number) => void;
}

const CategoryContext = createContext<CategoryContextValue | null>(null);

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  // Seed with the mock categories. New categories are added to state only
  // (not persisted yet).
  const [categories, setCategories] = useState<Category[]>(seedCategories);

  const addCategory = (category: Omit<Category, "id">) => {
    setCategories((prev) => {
      const nextId = prev.reduce((max, c) => Math.max(max, c.id), 0) + 1;
      return [...prev, { ...category, id: nextId }];
    });
  };

  const updateCategory = (id: number, category: Omit<Category, "id">) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...category, id } : c))
    );
  };

  const deleteCategory = (id: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
};