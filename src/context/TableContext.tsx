import React, { createContext, useContext, useState } from "react";
import { tables as seedTables, type Table } from "../data/tables";

interface TableContextValue {
  tables: Table[];
  addTable: (table: Omit<Table, "id">) => void;
}

const TableContext = createContext<TableContextValue | null>(null);

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
  // Seed with the mock tables. New tables are added to state only (not
  // persisted yet).
  const [tables, setTables] = useState<Table[]>(seedTables);

  const addTable = (table: Omit<Table, "id">) => {
    setTables((prev) => {
      const nextId = prev.reduce((max, t) => Math.max(max, t.id), 0) + 1;
      return [...prev, { ...table, id: nextId }];
    });
  };

  return (
    <TableContext.Provider value={{ tables, addTable }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTables = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTables must be used within a TableProvider");
  }
  return context;
};