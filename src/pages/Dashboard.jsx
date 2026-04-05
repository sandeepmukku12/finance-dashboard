import { useMemo } from "react";
import SummaryCard from "../components/SummaryCard";
import BalanceChart from "../components/BalanceChart";
import ExpenseChart from "../components/ExpenseChart";
import TransactionTable from "../components/TransactionTable";
import Insights from "../components/Insights";
import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { transactions } = useApp();

  // Calculate Summary Stats
  const { totalIncome, totalExpense, totalBalance } = useMemo(() => {
    let inc = 0, exp = 0;
    transactions.forEach(tx => {
      if (tx.type === "income") inc += Number(tx.amount);
      if (tx.type === "expense") exp += Number(tx.amount);
    });
    return { totalIncome: inc, totalExpense: exp, totalBalance: inc - exp };
  }, [transactions]);

  // Time-based Data for Balance Chart
  const balanceChartData = useMemo(() => {
    // Group by Month (e.g. "2026-01")
    const monthlyMap = {};
    
    // Sort transactions chronologically for running balance
    const sorted = [...transactions].sort((a,b) => new Date(a.date) - new Date(b.date));
    
    let runningBalance = 0;
    sorted.forEach(tx => {
      const monthLabel = new Date(tx.date).toLocaleDateString('en-US', { month: 'short' });
      if (tx.type === 'income') runningBalance += Number(tx.amount);
      if (tx.type === 'expense') runningBalance -= Number(tx.amount);
      
      monthlyMap[monthLabel] = runningBalance;
    });

    return Object.keys(monthlyMap).map(month => ({
      date: month,
      balance: monthlyMap[month]
    }));
  }, [transactions]);

  // Categorical Data for Expense Chart
  const expenseChartData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const grouped = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});
    
    return Object.keys(grouped)
      .map(key => ({ name: key, value: grouped[key] }))
      .sort((a, b) => b.value - a.value); // Sort largest expenses first
  }, [transactions]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Overview
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Total Balance" amount={totalBalance} isPositive={totalBalance >= 0} />
        <SummaryCard title="Total Income" amount={totalIncome} isPositive={true} />
        <SummaryCard title="Total Expenses" amount={totalExpense} isPositive={false} />
      </div>

      {/* Charts & Insights Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BalanceChart data={balanceChartData} />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Insights transactions={transactions} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ExpenseChart data={expenseChartData} />
        </div>
        <div className="lg:col-span-2">
          <TransactionTable />
        </div>
      </div>
    </div>
  );
}