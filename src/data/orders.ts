// src/data/orders.ts
// Mock order data for CoffeeFlow's admin section. Each order references a
// table (via `tableId`, matching the `id` in ./tables.ts) and carries a
// denormalized list of line items (product snapshot + chosen variants).

export type OrderStatus = "pending" | "confirmed";

export interface OrderItem {
  productId: number;
  name: string;
  image: string;
  price: number;
  // Maps a variant group name to the chosen option id (e.g. { Size: "large" }).
  selectedOptions: Record<string, string>;
  quantity: number;
  note?: string;
}

export interface Order {
  id: number;
  tableId: number;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: string;
}

export const orders: Order[] = [
  {
    id: 1,
    tableId: 1,
    status: "pending",
    createdAt: "2026-08-16T09:24:00",
    total: 9.0,
    items: [
      {
        productId: 103,
        name: "Cappuccino",
        image:
          "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=300&q=80",
        price: 4.0,
        selectedOptions: { Size: "large", Milk: "oat" },
        quantity: 1,
      },
      {
        productId: 301,
        name: "Jasmine Green Tea",
        image:
          "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=300&q=80",
        price: 3.0,
        selectedOptions: { Size: "medium", Sweetener: "honey" },
        quantity: 1,
        note: "Not too hot, please.",
      },
    ],
  },
  {
    id: 2,
    tableId: 3,
    status: "pending",
    createdAt: "2026-08-16T10:02:00",
    total: 12.0,
    items: [
      {
        productId: 201,
        name: "Classic Cold Brew",
        image:
          "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=300&q=80",
        price: 5.0,
        selectedOptions: { Size: "large", Sweetness: "caramel" },
        quantity: 2,
      },
    ],
  },
  {
    id: 3,
    tableId: 2,
    status: "confirmed",
    createdAt: "2026-08-16T08:45:00",
    total: 14.8,
    items: [
      {
        productId: 104,
        name: "Caffè Latte",
        image:
          "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=300&q=80",
        price: 4.5,
        selectedOptions: { Size: "large", Milk: "almond" },
        quantity: 1,
      },
      {
        productId: 202,
        name: "Iced Caramel Latte",
        image:
          "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=300&q=80",
        price: 5.5,
        selectedOptions: { Size: "medium", Milk: "whole" },
        quantity: 1,
      },
      {
        productId: 305,
        name: "Chai Spice",
        image:
          "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=300&q=80",
        price: 3.8,
        selectedOptions: { Size: "medium", Milk: "none" },
        quantity: 1,
      },
    ],
  },
];