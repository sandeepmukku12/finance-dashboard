import { createContext, useContext, useState, useEffect } from "react";
import { transactions as mockTx } from "../data/mockData";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [role, setRole] = useState("viewer");
  const [transactions, setTransactions] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const savedTx = localStorage.getItem("transactions");

    setRole(savedRole || "viewer");

    if (savedTx) {
      setTransactions(JSON.parse(savedTx));
    } else {
      setTransactions(mockTx);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("role", role);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [role, transactions]);

  return (
    <AppContext.Provider
      value={{ role, setRole, transactions, setTransactions }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
