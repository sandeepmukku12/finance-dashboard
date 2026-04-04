import SummaryCard from "../components/SummaryCard";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Finance Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <SummaryCard
          title="Total Balance"
          amount={52340}
          change={12}
          isPositive={true}
        />

        <SummaryCard
          title="Income"
          amount={84500}
          change={8}
          isPositive={true}
        />

        <SummaryCard
          title="Expenses"
          amount={32160}
          change={5}
          isPositive={false}
        />

      </div>

    </div>
  );
}