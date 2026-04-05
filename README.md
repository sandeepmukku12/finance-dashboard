# 💸 NovaFi: Finance Dashboard UI

📊 **NovaFi** is a modern, responsive **Frontend-only web application** built to help users track and understand their financial activity 🤝. It provides a clean interface to **view financial summaries**, **explore transactions**, and **analyze spending patterns** through interactive charts 📈. By leveraging **React Context and Local Storage**, NovaFi delivers a fully persistent and interactive experience entirely in the browser ✨

---

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-Vite-blue.svg)
![Tailwind](https://img.shields.io/badge/TailwindCSS-v3.0-38B2AC.svg)
![Author](https://img.shields.io/badge/Author--Sandeep%20Mukku-orange.svg)

---

## 📚 Table of Contents

- [🧰 Tech Stack](#-tech-stack)
- [✨ Features](#-features)
- [🎨 UI Highlights](#-ui-highlights)
- [🖼️ Screenshots](#-screenshots)
- [📦 Installation & Setup](#-installation--setup)
- [🚀 Usage](#-usage)
- [🏗 App Structure](#-app-structure)
- [🧠 Overview of Approach (State & Architecture)](#-overview-of-approach-state--architecture)
- [📈 Future Enhancements](#-future-enhancements)
- [❤️ Built With Love](#-built-with-love)

---

## 🧰 Tech Stack

This project was built entirely on the frontend to focus on UI/UX, component structuring, and state management without relying on a backend.

- ⚡ **React 18 (Vite)** – Chosen for lightning-fast HMR and an optimized build process.
- 🎨 **Tailwind CSS** – Used for highly customizable, utility-first styling and seamless Dark Mode implementation.
- 📊 **Recharts** – A composable charting library used to build the Balance Trend and Spending Breakdown visualizations.
- 🗄️ **React Context API** – Built-in state management for handling global data (transactions, theme, currency, roles).
- 💾 **Local Storage** – Used to persist user data and app settings across browser refreshes.

---

## ✨ Features

- 💼 **Dashboard Overview** – Dynamic summary cards (Total Balance, Income, Expenses) that calculate in real-time based on your transaction history.
- 📊 **Interactive Visualizations** – Features a time-based cash flow line chart and a categorical pie chart for spending breakdowns.
- 📝 **Transaction Management** – A robust table allowing users to search, filter (by type), and sort (by date/amount) their transactions.
- 🎭 **Simulated Role-Based Access (RBAC)** – Switch between `Viewer` (read-only) and `Admin` (can add, edit, delete, and wipe data) to demonstrate UI behavioral changes based on user permissions.
- 💡 **Automated Insights** – Dynamically calculates your highest spending category, overall savings rate, and total transaction count.
- 🌙 **Dark/Light Mode** – Full theme support that respects user preference and saves it for their next visit.
- 🌍 **Dynamic Currency** – Switch between INR (₹), USD ($), and EUR (€) in the settings, instantly updating formatting across the entire app.
- 📥 **CSV Export** – Download your filtered transaction list directly to your machine as a `.csv` file.

---

## 🎨 UI Highlights

- ✨ **Glassmorphism Touches** – Clean, modern overlays on mobile menus and specific insight cards.
- 📱 **Mobile-First Responsiveness** – The sidebar tucks away into a clean hamburger menu on smaller screens, and charts resize perfectly.
- 🎛️ **Custom Toggle Switches** – A slider for the Dark Mode toggle.
- 🚫 **Graceful Empty States** – If you clear all your data, the charts and tables show friendly "No data available" messages instead of breaking.

---

## 🖼 Screenshots


---

## 📦 Installation & Setup

To get started with **NovaFi** locally, follow these simple steps:

### 1. Clone the repository

   ```bash
   git clone [https://github.com/sandeepmukku12/finance-dashboard.git](https://github.com/sandeepmukku12/finance-dashboard.git)
   cd finance-dashboard
   ```
### 2. Install Dependencies

Make sure you have Node.js installed, then run:

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

---

### ✅ Notes

- Open your browser and navigate to `http://localhost:5173` (or the port Vite provides) to view the app.
- Because this app relies entirely on Local Storage, there is **no backend setup required**. It works right out of the box!

---

## 🚀 Usage

Here is a typical flow to test all the features of the dashboard:

- **Explore the Mock Data:** When you first load the app, it populates with mock transactions. Look at how the summary cards, line chart, and pie chart react to this data.
- **Switch Roles:** Look at the bottom of the sidebar. Change the role from `Viewer` to `Admin`. Notice how "+ Add New", "Edit", and "Delete" buttons suddenly appear on the Transactions table.
- **Add a Transaction:** (As Admin) Click "+ Add New", fill out the form, and hit save. Watch the charts and summary cards update instantly.
- **Search and Sort:** Type a category like "Food" into the search bar, or use the dropdowns to sort by "Highest Amount".
- **Export:** Click the "Export CSV" button to download your current table view.
- **Change App Settings:** Click "Settings" in the sidebar. Toggle Dark Mode, change the currency to USD ($), or hit "Clear All Data" (if Admin) to see the empty states.

---

## 🏗 App Structure

```text
finance-dashboard/
│
├─ public/              # Static assets
├─ src/
│  ├─ components/       # Reusable UI parts (Layout, Charts, Table, Modals)
│  ├─ context/          # AppContext.jsx (Global State & Local Storage sync)
│  ├─ data/             # mockData.js (Initial payload for first-time users)
│  ├─ pages/            # Main views (Dashboard, TransactionsPage, SettingsPage)
│  ├─ App.jsx           # Main component handling simple state-based routing
│  ├─ main.jsx          # Entry point wrapping the app in Context Providers
│  └─ index.css         # Tailwind directives and global styles
│
├─ tailwind.config.js   # Tailwind configuration and theme colors
├─ package.json         # Dependencies
└─ README.md            # Project documentation
```

---

## 🧠 Overview of Approach (State & Architecture)

Since the assignment requested a frontend-focused evaluation without a backend, I designed the architecture to feel as close to a production app as possible using React's built-in tools.

### 1. State Management (Context API)
Instead of prop-drilling or over-engineering with Redux, I opted for the **React Context API** (`AppContext.jsx`). It serves as a centralized store for:
- The `transactions` array.
- The user's active `role` (Admin/Viewer).
- App preferences (`theme` and `currency`).
- Helper methods to mutate data (`addTransaction`, `deleteTransaction`).

### 2. Data Persistence
To make the dashboard feel real, the Context provider uses `useEffect` hooks to synchronize state changes with the browser's **Local Storage**. When you add a transaction or change a theme, it saves instantly. On page reload, it hydrates the state from Local Storage, ensuring a seamless user experience.

### 3. Component Modularity
I broke the UI down into focused, single-responsibility components. For example:
- `Dashboard.jsx` handles fetching data from Context and using `useMemo` to derive chart-specific data arrays.
- `TransactionTable.jsx` is purely responsible for rendering the list, applying local sort/filter logic, and emitting actions.
- `Layout.jsx` handles the sidebar, mobile overlay, and standardizing the page wrappers.

### 4. Routing
To keep the application lightweight and focused on UI logic, I implemented a simple state-based routing mechanism in `App.jsx` (`activeTab`) rather than importing a heavy routing library like `react-router-dom`.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
