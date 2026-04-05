import { useState } from "react";

export default function TransactionTable({ data }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredData = data.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(search.toLowerCase()) ||
      tx.category.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || tx.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white dark:bg-[#111827] p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Transactions
        </h2>

        <div className="flex gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 border rounded bg-transparent text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Filter */}
          <select
            className="px-2 py-1 border rounded text-sm bg-transparent"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500 dark:text-gray-400 border-b">
            <tr>
              <th className="py-2">Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="py-2">{new Date(tx.date).toLocaleDateString()}</td>
                  <td>{tx.description}</td>
                  <td>{tx.category}</td>
                  <td>₹ {tx.amount}</td>
                  <td
                    className={
                      tx.type === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {tx.type}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}