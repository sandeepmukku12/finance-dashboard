import SummaryCard from "../components/SummaryCard";
import BalanceChart from "../components/BalanceChart";
import ExpenseChart from "../components/ExpenseChart";
import { balanceData, expenseData } from "../data/mockData";
import TransactionTable from "../components/TransactionTable";
import { transactions } from "../data/mockData";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Finance Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Total Balance" amount={52340} change={12} isPositive />
        <SummaryCard title="Income" amount={84500} change={8} isPositive />
        <SummaryCard title="Expenses" amount={32160} change={5} isPositive={false} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceChart data={balanceData} />
        <ExpenseChart data={expenseData} />
      </div>



      <TransactionTable data={transactions} />
    </div>
  );
}