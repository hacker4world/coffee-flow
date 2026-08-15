import React from "react";
import CategoryCard from "./CategoryCard";
import { categories } from "../data/coffeeData";

const CategoryList = () => {
  return (
    // Cards are capped at a comfortable max-width and centered so they don't
    // stretch edge-to-edge on wide screens, while still filling mobile widths
    <section className="py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Card container wrapping the heading and category cards */}
        <div className="bg-white rounded-3xl shadow-xl shadow-stone-400/40 ring-1 ring-stone-200 p-5">
          {/* Heading aligns with the cards */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              {/* Small amber accent bar to tie into the coffee/amber palette */}
              <span className="w-1 h-5 rounded-full bg-amber-700"></span>
              <h2
                className="text-xl font-display font-bold text-stone-800 tracking-tight"
              >
                Explore Menu
              </h2>
            </div>
          </div>

          <div>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                totalProducts={category.totalProducts}
                image={category.image}
                emoji={category.emoji}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
