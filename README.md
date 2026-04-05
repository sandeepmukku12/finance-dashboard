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


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
