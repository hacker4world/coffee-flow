// src/data/coffeeData.js
export interface Category {
  id: number;
  name: string;
  description: string;
  totalProducts: number;
  emoji: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Cafés",
    description: "Espressos, cappuccinos et lattes préparés avec soin",
    totalProducts: 8,
    emoji: "☕",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    name: "Boissons froides",
    description: "Cold brews, smoothies et boissons glacées rafraîchissantes",
    totalProducts: 6,
    emoji: "🧊",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    name: "Repas",
    description: "Sandwichs, salades et plats chauds gourmands",
    totalProducts: 5,
    emoji: "🍽️",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 4,
    name: "Desserts",
    description: "Pâtisseries, gâteaux et douceurs maison",
    totalProducts: 5,
    emoji: "🍰",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 5,
    name: "Chichas",
    description: "Une sélection de tabacs et saveurs à partager",
    totalProducts: 4,
    emoji: "💨",
    image:
      "https://media.istockphoto.com/id/626155034/photo/hookah-of-metal-glass-and-ceramics.jpg?s=612x612&w=0&k=20&c=wUd-GebZIdEB-b3OONIwm3STGDQAAU5WZzqw1WB7-ek=",
  },
];
