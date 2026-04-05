import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function BalanceChart({ data }) {
  return (
    <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm h-full">
      <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">
        Cash Flow Trend
      </h2>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
            <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
            <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[280px] flex items-center justify-center text-gray-500">No data available</div>
      )}
    </div>
  );
}