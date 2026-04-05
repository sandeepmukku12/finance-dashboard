import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Layout({ children }) {
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, setRole } = useApp();

  return (
    <div className={dark ? "dark" : ""}>
      <div className="flex h-screen bg-gray-100 dark:bg-[#0F172A]">
        {/* MOBILE OVERLAY */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`fixed z-50 md:static top-0 left-0 h-full w-64 bg-white dark:bg-[#111827] border-r dark:border-gray-800 p-5 transform transition-transform duration-300
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          {/* CLOSE BUTTON (Mobile Only) */}
          <button
            className="md:hidden mb-4 text-xl font-bold text-gray-600 dark:text-gray-300"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>

          <h2 className="text-lg font-bold mb-6">Zorvyn Finance</h2>

          <nav className="space-y-3">
            <p className="text-gray-600 dark:text-gray-300">Dashboard</p>
            <p className="text-gray-600 dark:text-gray-300">Transactions</p>
            <p className="text-gray-600 dark:text-gray-300">Insights</p>
          </nav>

          {/* Bottom controls */}
          <div className="absolute bottom-5 left-5 space-y-4 w-[85%]">
            {/* Role Switcher */}
            <div>
              <p className="text-xs mb-1 text-gray-500 dark:text-gray-400">
                Role
              </p>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full text-sm px-2 py-1 border rounded bg-transparent dark:border-gray-700"
              >
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Dark Mode */}
            <button
              onClick={() => setDark(!dark)}
              className="w-full text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
            >
              Toggle Theme
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col">
          {/* HEADER */}
          <header className="flex items-center justify-between p-4 bg-white dark:bg-[#111827] border-b dark:border-gray-800">
            {/* Hamburger (Mobile) */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-xl"
            >
              ☰
            </button>

            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Finance Dashboard
            </h1>

            <div />
          </header>

          {/* PAGE */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
