import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { transactions as mockTx } from "../data/mockData";

const AppContext = createContext();

const currencySymbols = {
  INR: "₹",
  USD: "$",
  EUR: "€"
};

export function AppProvider({ children }) {
  const [role, setRole] = useState("viewer");
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrency] = useState("INR"); //Currency State
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const savedTx = localStorage.getItem("transactions");
    const savedCurrency = localStorage.getItem("currency");

    if (savedRole) setRole(savedRole);
    if (savedCurrency) setCurrency(savedCurrency);
    
    if (savedTx) {
      setTransactions(JSON.parse(savedTx));
    } else {
      setTransactions(mockTx);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("role", role);
      localStorage.setItem("transactions", JSON.stringify(transactions));
      localStorage.setItem("currency", currency);
    }
  }, [role, transactions, currency, isLoaded]);

  const addTransaction = (tx) => setTransactions([{ ...tx, id: Date.now() }, ...transactions]);
  const updateTransaction = (updatedTx) => setTransactions(transactions.map(tx => tx.id === updatedTx.id ? updatedTx : tx));
  const deleteTransaction = (id) => setTransactions(transactions.filter((tx) => tx.id !== id));

  // function to format currency across the app
  const formatCurrency = useCallback((amount) => {
    const symbol = currencySymbols[currency] || "₹";
    return `${symbol} ${amount.toLocaleString()}`;
  }, [currency]);

  return (
    <AppContext.Provider
      value={{ 
        role, setRole, 
        transactions, addTransaction, updateTransaction, deleteTransaction,
        currency, setCurrency, formatCurrency, currencySymbol: currencySymbols[currency]
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);