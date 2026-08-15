// src/data/products.ts
// Mock product data for CoffeeFlow. Each product belongs to a category via
// `categoryId` (matching the `id` in ./coffeeData.ts). Prices are in TND.

export const products = [
  // ── Espresso Classics (categoryId: 1) ────────────────────────────────
  {
    id: 101,
    categoryId: 1,
    name: "Classic Espresso",
    price: 2.5,
    image:
      "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=300&q=80",
    description: "A bold single shot pulled from our signature dark roast.",
    variants: [
      {
        name: "Size",
        options: [
          { id: "single", name: "Single", priceDelta: 0 },
          { id: "double", name: "Double", priceDelta: 1.0 },
        ],
      },
      {
        name: "Temperature",
        options: [
          { id: "hot", name: "Hot", priceDelta: 0 },
          { id: "iced", name: "Iced", priceDelta: 0 },
        ],
      },
    ],
  },
  {
    id: 102,
    categoryId: 1,
    name: "Double Espresso",
    price: 3.5,
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80",
    description: "Two rich shots for a serious caffeine kick.",
    variants: [
      {
        name: "Size",
        options: [
          { id: "single", name: "Single", priceDelta: 0 },
          { id: "double", name: "Double", priceDelta: 1.0 },
        ],
      },
      {
        name: "Extra Shot",
        options: [
          { id: "none", name: "None", priceDelta: 0 },
          { id: "one", name: "+1 Shot", priceDelta: 0.8 },
        ],
      },
    ],
  },
  {
    id: 103,
    categoryId: 1,
    name: "Cappuccino",
    price: 4.0,
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=300&q=80",
    description: "Espresso with velvety steamed milk and a thick foam cap.",
    variants: [
      {
        name: "Size",
        options: [
          { id: "small", name: "Small", priceDelta: 0 },
          { id: "medium", name: "Medium", priceDelta: 0.5 },
          { id: "large", name: "Large", priceDelta: 1.0 },
        ],
      },
      {
        name: "Milk",
        options: [
          { id: "whole", name: "Whole", priceDelta: 0 },
          { id: "oat", name: "Oat", priceDelta: 0.5 },
          { id: "almond", name: "Almond", priceDelta: 0.5 },
        ],
      },
    ],
  },
  {
    id: 104,
    categoryId: 1,
    name: "Caffè Latte",
    price: 4.5,
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=300&q=80",
    description: "Smooth espresso balanced with silky steamed milk.",
    variants: [
      {
        name: "Size",
        options: [
          { id: "small", name: "Small", priceDelta: 0 },
          { id: "medium", name: "Medium", priceDelta: 0.5 },
          { id: "large", name: "Large", priceDelta: 1.0 },
        ],
      },
      {
        name: "Milk",
        options: [
          { id: "whole", name: "Whole", priceDelta: 0 },
          { id: "oat", name: "Oat", priceDelta: 0.5 },
          { id: "almond", name: "Almond", priceDelta: 0.5 },
        ],
      },
    ],
  },
  {
    id: 105,
    categoryId: 1,
    name: "Flat White",
    price: 4.8,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300&q=80",
    description: "Double ristretto with micro-foamed milk, served short.",
    variants: [
      {
        name: "Size",
        options: [
          { id: "small", name: "Small", priceDelta: 0 },
          { id: "medium", name: "Medium", priceDelta: 0.5 },
          { id: "large", name: "Large", priceDelta: 1.0 },
        ],
      },
      {
        name: "Milk",
        options: [
          { id: "whole", name: "Whole", priceDelta: 0 },
          { id: "oat", name: "Oat", priceDelta: 0.5 },
          { id: "almond", name: "Almond", priceDelta: 0.5 },
        ],
      },
    ],
  },

  // ── Cold Brews & Iced (categoryId: 2) ────────────────────────────────
  {
    id: 201,
    categoryId: 2,
    name: "Classic Cold Brew",
    price: 5.0,
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=300&q=80",
    description: "Slow-steeped for 18 hours, served over ice.",
    variants: [
      {
        name: "Size",
        options: [
          { id: "small", name: "Small", priceDelta: 0 },
          { id: "medium", name: "Medium", priceDelta: 0.5 },
          { id: "large", name: "Large", priceDelta: 1.0 },
        ],
      },
      {
        name: "Sweetness",
        options: [
          { id: "unsweetened", name: "Unsweetened", priceDelta: 0 },
          { id: "vanilla", name: "Vanilla", priceDelta: 0 },
          { id: "caramel", name: "Caramel", priceDelta: 0.3 },
        ],
      },
    ],
  },
  {
    id: 202,
    categoryId: 2,
    name: "Iced Caramel Latte",
    price: 5.5,
    image:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=300&q=80",
    description: "Chilled espresso, milk and caramel over ice.",
    variants: [
      {
        name: "Size",
        options: [
          { id: "small", name: "Small", priceDelta: 0 },
          { id: "medium", name: "Medium", priceDelta: 0.5 },
          { id: "large", name: "Large", priceDelta: 1.0 },
        ],
      },
      {
        name: "Milk",
        options: [
          { id: "whole", name: "Whole", priceDelta: 0 },
          { id: "oat", name: "Oat", priceDelta: 0.5 },
          { id: "almond", name: "Almond", priceDelta: 0.5 },
        ],
      },
    ],
  },
  {
    id: 203,
    categoryId: 2,
    name: "Nitro Cold Brew",
    price: 6.0,
    image:
      "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=300&q=80",
    description: "Cold brew infused with nitrogen for a creamy cascade.",
    variants: [
      {
        name: "Size",
        options: [
          { id: "small", name: "Small", priceDelta: 0 },
          { id: "medium", name: "Medium", priceDelta: 0.5 },
          { id: "large", name: "Large", priceDelta: 1.0 },
        ],
      },
      {
        name: "Sweetness",
        options: [
          { id: "unsweetened", name: "Unsweetened", priceDelta: 0 },
          { id: "vanilla", name: "Vanilla", priceDelta: 0 },
          { id: "caramel", name: "Caramel", priceDelta: 0.3 },
        ],
      },
    ],
  },
  {
    id: 204,
    categoryId: 2,
    name: "Iced Matcha Latte",
    price: 5.8,
    image:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=300&q=80",
    description: "Ceremonial matcha whisked with cold milk and ice.",
    variants: [
      {
        name: "Size",
        options: [
          { id: "small", name: "Small", priceDelta: 0 },
          { id: "medium", name: "Medium", priceDelta: 0.5 },
          { id: "large", name: "Large", priceDelta: 1.0 },
        ],
      },
      {
        name: "Milk",
        options: [
          { id: "whole", name: "Whole", priceDelta: 0 },
          { id: "oat", name: "Oat", priceDelta: 0.5 },
          { id: "almond", name: "Almond", priceDelta: 0.5 },
        ],
      },
    ],
  },
  {
    id: 205,
    categoryId: 2,
    name: "Cold Brew Tonic",
    price: 5.2,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80",
    description: "Cold brew topped with sparkling tonic and a citrus twist.",
    variants: [
      {
        name: "Size",
        options: [
          { id: "small", name: "Small", priceDelta: 0 },
          { id: "medium", name: "Medium", priceDelta: 0.5 },
          { id: "large", name: "Large", priceDelta: 1.0 },
        ],
      },
      {
        name: "Citrus",
        options: [
          { id: "lemon", name: "Lemon", priceDelta: 0 },
          { id: "orange", name: "Orange", priceDelta: 0 },
          { id: "grapefruit", name: "Grapefruit", priceDelta: 0.2 },
        ],
      },
    ],
  },

  // ── Artisan Teas (categoryId: 3) ─────────────────────────────────────
  {
    id: 301,
    categoryId: 3,
    name: "Jasmine Green Tea",
    price: 3.0,
    image:
      "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=300&q=80",
    description: "Fragrant green tea scented with fresh jasmine blossoms.",
    variants: [
      {
        name: "Size",
        options: [
          { id: "small", name: "Small", priceDelta: 0 },
          { id: "medium", name: "Medium", priceDelta: 0.5 },
          { id: "large", name: "Large", priceDelta: 1.0 },
        ],
      },
      {
        name: "Sweetener",
        options: [
          { id: "none", name: "None", priceDelta: 0 },
          { id: "honey", name: "Honey", priceDelta: 0.3 },
          { id: "sugar", name: "Sugar", priceDelta: 0 },
        ],
      },
    ],
  },
  {
    id: 302,
    categoryId: 3,
    name: "Earl Grey",
    price: 3.2,
    image:
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=300&q=80",
    description: "Black tea with a bright note of bergamot oil.",
    variants: [
      {
        name: "Size",
        options: [
          { id: "small", name: "Small", priceDelta: 0 },
          { id: "medium", name: "Medium", priceDelta: 0.5 },
          { id: "large", name: "Large", priceDelta: 1.0 },
        ],
      },
      {
        name: "Milk",
        options: [
          { id: "none", name: "None", priceDelta: 0 },
          { id: "whole", name: "Whole", priceDelta: 0 },
          { id: "oat", name: "Oat", priceDelta: 0.5 },
        ],
      },
    ],
  },
  {
    id: 303,
    categoryId: 3,
    name: "Chamomile Bloom",
    price: 3.4,
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&q=80",
    description: "Calming chamomile flowers with a hint of honey.",
    variants: [
      {
        name: "Size",
        options: [
          { id: "small", name: "Small", priceDelta: 0 },
          { id: "medium", name: "Medium", priceDelta: 0.5 },
          { id: "large", name: "Large", priceDelta: 1.0 },
        ],
      },
      {
        name: "Sweetener",
        options: [
          { id: "none", name: "None", priceDelta: 0 },
          { id: "honey", name: "Honey", priceDelta: 0.3 },
          { id: "sugar", name: "Sugar", priceDelta: 0 },
        ],
      },
    ],
  },
  {
    id: 304,
    categoryId: 3,
    name: "Moroccan Mint",
    price: 3.5,
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=300&q=80",
    description: "Gunpowder green tea blended with fresh spearmint.",
    variants: [
      {
        name: "Size",
        options: [
          { id: "small", name: "Small", priceDelta: 0 },
          { id: "medium", name: "Medium", priceDelta: 0.5 },
          { id: "large", name: "Large", priceDelta: 1.0 },
        ],
      },
      {
        name: "Sweetener",
        options: [
          { id: "none", name: "None", priceDelta: 0 },
          { id: "honey", name: "Honey", priceDelta: 0.3 },
          { id: "sugar", name: "Sugar", priceDelta: 0 },
        ],
      },
    ],
  },
  {
    id: 305,
    categoryId: 3,
    name: "Chai Spice",
    price: 3.8,
    image:
      "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=300&q=80",
    description: "Black tea simmered with cinnamon, cardamom and ginger.",
    variants: [
      {
        name: "Size",
        options: [
          { id: "small", name: "Small", priceDelta: 0 },
          { id: "medium", name: "Medium", priceDelta: 0.5 },
          { id: "large", name: "Large", priceDelta: 1.0 },
        ],
      },
      {
        name: "Milk",
        options: [
          { id: "none", name: "None", priceDelta: 0 },
          { id: "whole", name: "Whole", priceDelta: 0 },
          { id: "oat", name: "Oat", priceDelta: 0.5 },
        ],
      },
    ],
  },
];
