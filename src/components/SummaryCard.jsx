import clsx from "clsx";

export default function SummaryCard({ title, amount, change, isPositive }) {
  return (
    <div className="bg-white dark:bg-[#111827] p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:scale-[1.02] transition">
      {/* Title */}
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

      {/* Amount */}
      <h2 className="text-2xl font-semibold mt-2 text-gray-900 dark:text-white">
        ₹ {amount.toLocaleString()}
      </h2>

      {/* Change */}
      <div className="mt-2 flex items-center gap-2">
        <span
          className={clsx(
            "text-sm font-medium",
            isPositive ? "text-green-500" : "text-red-500",
          )}
        >
          {isPositive ? "↑" : "↓"} {change}%
        </span>

        <span className="text-xs text-gray-500 dark:text-gray-400">
          vs last month
        </span>
      </div>
    </div>
  );
}
