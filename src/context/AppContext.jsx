import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [role, setRole] = useState("viewer");
  const [transactions, setTransactions] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const savedTx = localStorage.getItem("transactions");

    if (savedRole) setRole(savedRole);
    if (savedTx) setTransactions(JSON.parse(savedTx));
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