// src/data/products.ts
// Mock product data for CoffeeFlow. Each product belongs to a category via
// `categoryId` (matching the `id` in ./coffeeData.ts). Prices are in TND.

export interface ProductVariantOption {
  id: string;
  name: string;
  priceDelta: number;
}

export interface ProductVariant {
  name: string;
  options: ProductVariantOption[];
}

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  price: number;
  image: string;
  description: string;
  variants: ProductVariant[];
}

export const products: Product[] = [
  // ── Cafés (categoryId: 1) ─────────────────────────────────────────────
  {
    id: 101,
    categoryId: 1,
    name: "Express",
    price: 4.0,
    image:
      "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=300&q=80",
    description: "Un express préparé à la demande, simple ou double.",
    variants: [
      {
        name: "Type",
        options: [
          { id: "single", name: "Simple", priceDelta: 0 },
          { id: "double", name: "Double", priceDelta: 2.0 },
        ],
      },
      {
        name: "Saveur",
        options: [
          { id: "nature", name: "Nature", priceDelta: 0 },
          { id: "caramel", name: "Caramel", priceDelta: 1.0 },
          { id: "nestle", name: "Nestlé", priceDelta: 1.0 },
        ],
      },
    ],
  },
  {
    id: 106,
    categoryId: 1,
    name: "Cappucin",
    price: 5.0,
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=300&q=80",
    description: "Un expresso adouci avec du lait, avec ou sans mousse.",
    variants: [
      {
        name: "Mousse",
        options: [
          { id: "with", name: "Avec mousse", priceDelta: 0 },
          { id: "without", name: "Sans mousse", priceDelta: 0 },
        ],
      },
      {
        name: "Saveur",
        options: [
          { id: "nature", name: "Nature", priceDelta: 0 },
          { id: "nestle", name: "Nestlé", priceDelta: 1.0 },
          { id: "chocolat", name: "Chocolat", priceDelta: 1.0 },
        ],
      },
    ],
  },
  {
    id: 107,
    categoryId: 1,
    name: "Café au lait",
    price: 5.0,
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=300&q=80",
    description: "Un café au lait préparé avec une poudre de café différente.",
    variants: [],
  },
  {
    id: 108,
    categoryId: 1,
    name: "Cappucino",
    price: 6.0,
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=300&q=80",
    description: "Un cappucino onctueux, préparé avec soin.",
    variants: [],
  },
  {
    id: 109,
    categoryId: 1,
    name: "Café crème",
    price: 8.0,
    image:
      "https://media.istockphoto.com/id/2220401154/photo/coffee-cup-and-coffee-beans-on-wooden-table-espresso-crema-coffee-cup-aromatic.jpg?s=612x612&w=0&k=20&c=M71IHjkETXUNqz-Lda5kSIg1KVmpK_XFbf-GvIg_kIQ=",
    description: "Un café crème généreux et savoureux.",
    variants: [],
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
