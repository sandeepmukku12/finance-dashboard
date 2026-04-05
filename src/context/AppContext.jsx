import { createContext, useContext, useState, useEffect } from "react";
import { transactions as mockTx } from "../data/mockData";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [role, setRole] = useState("viewer");
  const [transactions, setTransactions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const savedTx = localStorage.getItem("transactions");

    if (savedRole) setRole(savedRole);
    if (savedTx) {
      setTransactions(JSON.parse(savedTx));
    } else {
      setTransactions(mockTx); // Fallback to mock data
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("role", role);
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [role, transactions, isLoaded]);

  const addTransaction = (tx) => {
    setTransactions([{ ...tx, id: Date.now() }, ...transactions]);
  };

  const updateTransaction = (updatedTx) => {
    setTransactions(transactions.map(tx => tx.id === updatedTx.id ? updatedTx : tx));
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  return (
    <AppContext.Provider
      value={{ 
        role, 
        setRole, 
        transactions, 
        addTransaction, 
        updateTransaction, 
        deleteTransaction 
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);