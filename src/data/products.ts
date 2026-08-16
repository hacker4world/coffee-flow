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
    name: "Jus citron",
    price: 7.0,
    image:
      "https://img.magnific.com/free-photo/glass-cup-fresh-lemon-juice-wooden-board_114579-53580.jpg",
    description: "Jus de citron frais et rafraîchissant.",
    variants: [],
  },
  {
    id: 202,
    categoryId: 2,
    name: "Jus de fraise",
    price: 7.0,
    image:
      "https://media.istockphoto.com/id/178416773/photo/some-glasses-with-strawberry-liqueur.jpg?s=612x612&w=0&k=20&c=wo7eqLKBOV-FQZ15Lo7A3RMLPAdvwbkVPqlZm_GM9pc=",
    description: "Jus de fraise naturellement sucré.",
    variants: [],
  },

  // ── Repas (categoryId: 3) ─────────────────────────────────────────────
  {
    id: 306,
    categoryId: 3,
    name: "Pizza Neptune",
    price: 8.0,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80",
    description: "Pizza au fromage avec garniture de fruits de mer.",
    variants: [
      {
        name: "Taille",
        options: [
          { id: "mini", name: "Mini", priceDelta: 0 },
          { id: "moyenne", name: "Moyenne", priceDelta: 1.5 },
          { id: "large", name: "Large", priceDelta: 3.0 },
        ],
      },
    ],
  },
  {
    id: 307,
    categoryId: 3,
    name: "Makloub Escalope",
    price: 9.5,
    image:
      "https://linstant-m.tn/uploads/24421169fb9888577a04c3e6a86da23d5d73b587.jpg",
    description: "Makloub à l'escalope avec légumes et sauce.",
    variants: [
      {
        name: "Sauce",
        options: [
          { id: "mayonnaise", name: "Mayonnaise", priceDelta: 0 },
          { id: "barbecue", name: "Sauce barbecue", priceDelta: 0 },
          { id: "ketchup", name: "Ketchup", priceDelta: 0 },
        ],
      },
    ],
  },
  {
    id: 308,
    categoryId: 3,
    name: "Panini",
    price: 6.5,
    image:
      "https://cdn.shopify.com/s/files/1/0173/8181/8422/files/20241003170904-chicken-2c-20mozzarella-2c-20-26-20kale-20pesto-20panini.jpg?v=1727975346&width=1600&height=900",
    description: "Sandwich grillé avec vos choix de garnitures.",
    variants: [],
  },
  {
    id: 309,
    categoryId: 4,
    name: "Crepe chocolat",
    price: 5.5,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGJLIciTCBClDVn5b_ASKaqclapFsxrZ_X9wFOtDBt1G_L7muvhR3CfM&s=10",
    description: "Crêpe au chocolat avec sauce chocolat.",
    variants: [],
  },
  {
    id: 310,
    categoryId: 4,
    name: "Gateau chocolat",
    price: 6.0,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=300&q=80",
    description: "Gâteau au chocolat moelleux.",
    variants: [],
  },
  {
    id: 311,
    categoryId: 4,
    name: "Tiramisu",
    price: 6.5,
    image:
      "https://www.cakesperiments.com/wp-content/uploads/2025/05/Tiramisu-9-1024x1536.jpg",
    description: "Tiramisu italien à la caféine.",
    variants: [],
  },
  {
    id: 312,
    categoryId: 5,
    name: "Chicha menthe",
    price: 10.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGAUfnkFbHvJ4bght_qVPblGTSYHRcZRjhXskqPZwbIjx4eAV_7GiUW6RR&s=10",
    description: "Chicha à la menthe fraîche.",
    variants: [
      {
        name: "Type",
        options: [
          { id: "normal", name: "Normal", priceDelta: 0 },
          { id: "ice", name: "Avec glace", priceDelta: 3.0 },
        ],
      },
    ],
  },
  {
    id: 313,
    categoryId: 5,
    name: "Chicha pomme",
    price: 10.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGAUfnkFbHvJ4bght_qVPblGTSYHRcZRjhXskqPZwbIjx4eAV_7GiUW6RR&s=10",
    description: "Chicha au parfum pomme.",
    variants: [
      {
        name: "Type",
        options: [
          { id: "normal", name: "Normal", priceDelta: 0 },
          { id: "ice", name: "Avec glace", priceDelta: 3.0 },
        ],
      },
    ],
  },
  {
    id: 314,
    categoryId: 5,
    name: "Chicha love",
    price: 13.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGAUfnkFbHvJ4bght_qVPblGTSYHRcZRjhXskqPZwbIjx4eAV_7GiUW6RR&s=10",
    description: "Chicha aux fruits rouges.",
    variants: [
      {
        name: "Type",
        options: [
          { id: "normal", name: "Normal", priceDelta: 0 },
          { id: "ice", name: "Avec glace", priceDelta: 3.0 },
        ],
      },
    ],
  },
  {
    id: 315,
    categoryId: 5,
    name: "Chicha cookies",
    price: 14.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGAUfnkFbHvJ4bght_qVPblGTSYHRcZRjhXskqPZwbIjx4eAV_7GiUW6RR&s=10",
    description: "Chicha au goût cookies.",
    variants: [
      {
        name: "Type",
        options: [
          { id: "normal", name: "Normal", priceDelta: 0 },
          { id: "ice", name: "Avec glace", priceDelta: 3.0 },
        ],
      },
    ],
  },
  {
    id: 316,
    categoryId: 5,
    name: "Chicha cocktail",
    price: 15.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGAUfnkFbHvJ4bght_qVPblGTSYHRcZRjhXskqPZwbIjx4eAV_7GiUW6RR&s=10",
    description: "Chicha cocktail exotique.",
    variants: [
      {
        name: "Type",
        options: [
          { id: "normal", name: "Normal", priceDelta: 0 },
          { id: "ice", name: "Avec glace", priceDelta: 3.0 },
        ],
      },
    ],
  },
];
