export default function Insights({ transactions }) {
  const expenses = transactions.filter(t => t.type === 'expense');
  const income = transactions.filter(t => t.type === 'income');

  // Calculate highest spending category
  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
    return acc;
  }, {});
  
  const highestCategory = Object.keys(categoryTotals).length > 0 
    ? Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b)
    : "None";

  // Calculate savings rate
  const totalInc = income.reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExp = expenses.reduce((sum, t) => sum + Number(t.amount), 0);
  const savingsRate = totalInc > 0 ? Math.round(((totalInc - totalExp) / totalInc) * 100) : 0;

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg h-full flex flex-col justify-center">
      <h2 className="text-xl font-bold mb-4 opacity-90">Financial Insights 💡</h2>
      <div className="space-y-4">
        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
          <p className="text-blue-100 text-sm">Top Spending Category</p>
          <p className="text-2xl font-semibold">{highestCategory}</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/10 p-4 rounded-xl flex-1 backdrop-blur-sm">
            <p className="text-blue-100 text-sm">Savings Rate</p>
            <p className="text-xl font-semibold">{savingsRate}%</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl flex-1 backdrop-blur-sm">
            <p className="text-blue-100 text-sm">Total Transactions</p>
            <p className="text-xl font-semibold">{transactions.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}