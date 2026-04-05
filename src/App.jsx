import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import TransactionsPage from "./pages/TransactionsPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "dashboard" && <Dashboard />}
      {activeTab === "transactions" && <TransactionsPage />}
      {activeTab === "settings" && <SettingsPage />}
    </Layout>
  );
}

export default App;