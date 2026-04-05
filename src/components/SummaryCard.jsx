import clsx from "clsx";
import { useApp } from "../context/AppContext";

export default function SummaryCard({ title, amount, change, isPositive }) {
  const { formatCurrency } = useApp();

  return (
    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      
      <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
        {formatCurrency(amount)}
      </h2>

      {change !== undefined && (
        <div className="mt-3 flex items-center gap-2">
          <span
            className={clsx(
              "text-sm font-semibold px-2 py-0.5 rounded-full",
              isPositive 
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
              change === 0 && "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
            )}
          >
            {change === 0 ? "—" : isPositive ? "↑" : "↓"} {Math.abs(change)}%
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            vs previous
          </span>
        </div>
      )}
    </div>
  );
}