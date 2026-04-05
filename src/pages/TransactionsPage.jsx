import TransactionTable from "../components/TransactionTable";

export default function TransactionsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          All Transactions
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          View, search, and manage your complete financial history.
        </p>
      </div>
      
      <TransactionTable />
    </div>
  );
}