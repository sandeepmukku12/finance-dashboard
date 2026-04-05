import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

export default function Layout({ children }) {
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, setRole } = useApp();

  // Handle system preference and local storage for dark mode
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark" || 
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(isDark);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#0F172A] text-gray-900 dark:text-gray-100 font-sans">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed z-50 md:static top-0 left-0 h-full w-64 bg-white dark:bg-[#1E293B] border-r border-gray-200 dark:border-gray-800 p-6 transform transition-transform duration-300 shadow-xl md:shadow-none
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <button
          className="md:hidden absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-800 dark:hover:text-white"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Zorvyn Finance
        </h2>

        <nav className="space-y-4">
          <a href="#" className="block px-4 py-2 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium">Dashboard</a>
          <a href="#" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50 transition">Transactions</a>
          <a href="#" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50 transition">Settings</a>
        </nav>

        {/* Bottom controls */}
        <div className="absolute bottom-6 left-6 right-6 space-y-4 border-t border-gray-200 dark:border-gray-800 pt-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              Active Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            onClick={() => setDark(!dark)}
            className="w-full flex items-center justify-center gap-2 text-sm px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg font-medium transition"
          >
            {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <header className="flex items-center justify-between p-4 md:px-8 bg-white dark:bg-[#1E293B] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-2xl text-gray-600 dark:text-gray-300"
          >
            ☰
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-sm">
              U
            </div>
          </div>
        </header>

        {/* PAGE */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}