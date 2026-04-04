import { useState } from "react";

export default function Layout({ children }) {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="flex h-screen bg-gray-100 dark:bg-[#0F172A]">
        
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-[#111827] border-r dark:border-gray-800 p-5">
          <h2 className="text-lg font-bold mb-6">Zorvyn Finance</h2>

          <nav className="space-y-3">
            <p className="text-gray-600 dark:text-gray-300">Dashboard</p>
            <p className="text-gray-600 dark:text-gray-300">Transactions</p>
            <p className="text-gray-600 dark:text-gray-300">Insights</p>
          </nav>

          {/* Bottom controls */}
          <div className="absolute bottom-5 left-5 space-y-3">
            <button
              onClick={() => setDark(!dark)}
              className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
            >
              Toggle Theme
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}