import React, { createContext, useContext, useState } from "react";
import { orders as seedOrders, type Order } from "../data/orders";

interface OrderContextValue {
  orders: Order[];
  confirmOrder: (id: number) => void;
  deleteOrder: (id: number) => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  // Seed with the mock orders. Confirming updates state only (not persisted).
  const [orders, setOrders] = useState<Order[]>(seedOrders);

  const confirmOrder = (id: number) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "confirmed" } : o))
    );
  };

  const deleteOrder = (id: number) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <OrderContext.Provider value={{ orders, confirmOrder, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};