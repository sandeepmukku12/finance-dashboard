import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

export default function Layout({ children, activeTab, setActiveTab }) {
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, setRole } = useApp();

  // Handle system preference and local storage for dark mode
  useEffect(() => {
    const isDark =
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
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

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "transactions", label: "Transactions" },
    { id: "settings", label: "Settings" },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setSidebarOpen(false); // Close sidebar on mobile after clicking
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#0F172A] text-gray-900 dark:text-gray-100 font-sans overflow-hidden">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed z-50 md:static top-0 left-0 h-full w-64 bg-white dark:bg-[#1E293B] border-r border-gray-200 dark:border-gray-800 p-6 transform transition-transform duration-300 shadow-xl md:shadow-none flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <button
          className="md:hidden absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-800 dark:hover:text-white"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>

        <div className="mb-8 mt-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            NovaFi
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium tracking-wide">
            Made by{" "}
            <a
              href="https://github.com/sandeepmukku12"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 underline decoration-transparent hover:decoration-blue-600 dark:hover:decoration-blue-400 underline-offset-2"
            >
              SANDEEP MUKKU
            </a>
          </p>
        </div>

        <nav className="space-y-3 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors font-medium ${
                activeTab === item.id
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom controls */}
        <div className="space-y-4 border-t border-gray-200 dark:border-gray-800 pt-6 mt-auto">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              Active Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Dark Mode Slider Toggle */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {dark ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </span>
            <button
              onClick={() => setDark(!dark)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none ${
                dark ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-300 ease-in-out shadow-sm ${
                  dark ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* HEADER */}
        <header className="flex items-center justify-between p-4 md:px-8 bg-white dark:bg-[#1E293B] border-b border-gray-200 dark:border-gray-800 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-2xl text-gray-600 dark:text-gray-300"
          >
            ☰
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-white dark:ring-gray-800">
              U
            </div>
          </div>
        </header>

        {/* SCROLLABLE PAGE AREA */}
        <main className="flex-1 overflow-y-auto flex flex-col relative">
          <div className="flex-1 p-4 md:p-8 w-full max-w-7xl mx-auto">
            {children}
          </div>

          {/* FOOTER */}
          <footer className="w-full py-6 mt-auto border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-[#1E293B]">
            <p>© {new Date().getFullYear()} NovaFi. All rights reserved.</p>
            <p className="mt-1">
              Designed & Developed by{" "}
              <a
                href="https://github.com/sandeepmukku12"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 underline decoration-transparent hover:decoration-blue-600 dark:hover:decoration-blue-400 underline-offset-4"
              >
                SANDEEP MUKKU
              </a>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
