// src/data/tables.ts
// Mock table data for CoffeeFlow's admin section. Each table has a number,
// a capacity (seats) and an image. This is seed data for now — creation/
// editing comes later.

export interface Table {
  id: number;
  number: number;
  capacity: number;
  image: string;
}

export const tables: Table[] = [
  {
    id: 1,
    number: 1,
    capacity: 2,
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    number: 2,
    capacity: 4,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    number: 3,
    capacity: 2,
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 4,
    number: 4,
    capacity: 6,
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 5,
    number: 5,
    capacity: 4,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=300&q=80",
  },
];