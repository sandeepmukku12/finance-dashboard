import { useState } from "react";
import { useApp } from "../context/AppContext";
import TransactionModal from "./TransactionModal";

export default function TransactionTable() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("date-desc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);
  
  const { role, transactions, addTransaction, updateTransaction, deleteTransaction } = useApp();

  // Filter and Sort Logic
  const processedData = transactions
    .filter((tx) => {
      const matchesSearch = tx.description.toLowerCase().includes(search.toLowerCase()) ||
                            tx.category.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" || tx.type === filter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortOrder === "date-desc") return new Date(b.date) - new Date(a.date);
      if (sortOrder === "date-asc") return new Date(a.date) - new Date(b.date);
      if (sortOrder === "amt-desc") return b.amount - a.amount;
      if (sortOrder === "amt-asc") return a.amount - b.amount;
      return 0;
    });

  const handleExportCSV = () => {
    const headers = ["Date", "Description", "Category", "Amount", "Type"];
    const rows = processedData.map(tx => [tx.date, tx.description, tx.category, tx.amount, tx.type]);
    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions.csv";
    link.click();
  };

  const handleSaveTx = (tx) => {
    if (tx.id) updateTransaction(tx);
    else addTransaction(tx);
  };

  return (
    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Transactions</h2>

        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="px-4 py-2 border rounded-lg text-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700 outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select
            className="px-4 py-2 border rounded-lg text-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700 outline-none"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amt-desc">Highest Amount</option>
            <option value="amt-asc">Lowest Amount</option>
          </select>

          <button 
            onClick={handleExportCSV}
            className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Export CSV
          </button>

          {role === "admin" && (
            <button 
              onClick={() => { setEditingTx(null); setIsModalOpen(true); }}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              + Add New
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800/50 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3 rounded-l-lg">Date</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Type</th>
              {role === "admin" && <th className="px-4 py-3 rounded-r-lg">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {processedData.length > 0 ? (
              processedData.map((tx) => (
                <tr key={tx.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                  <td className="px-4 py-3 text-gray-500">{new Date(tx.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{tx.description}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs">{tx.category}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold">{formatCurrency(tx.amount)}</td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center gap-1.5 ${tx.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${tx.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </span>
                  </td>
                  {role === "admin" && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingTx(tx); setIsModalOpen(true); }} className="text-blue-500 hover:underline">Edit</button>
                        <button onClick={() => deleteTransaction(tx.id)} className="text-red-500 hover:underline">Delete</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === "admin" ? 6 : 5} className="text-center py-8 text-gray-500">
                  No transactions found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveTx}
        editingTx={editingTx}
      />
    </div>
  );
}