import { useApp } from "../context/AppContext";

export default function SettingsPage() {
  const { role, setTransactions } = useApp();

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to delete all transactions? This cannot be undone.")) {
      setTransactions([]);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your account preferences and application data.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        
        {/* Profile Section */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h2>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              U
            </div>
            <div className="space-y-3 flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Name</label>
                <input type="text" defaultValue="Demo User" disabled className="w-full md:w-1/2 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* App Preferences */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preferences</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency</label>
              <select disabled className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500">
                <option>INR (₹) - Default</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Currency formatting is currently locked for this demo.</p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        {role === 'admin' ? (
          <div className="p-6 bg-red-50/50 dark:bg-red-900/10">
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Danger Zone</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Permanently remove all transaction data from your local storage.
            </p>
            <button 
              onClick={handleClearData}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Clear All Data
            </button>
          </div>
        ) : (
          <div className="p-6">
             <p className="text-sm text-gray-500 italic">Switch to Admin role to access data management settings.</p>
          </div>
        )}

      </div>
    </div>
  );
}