import { useState, useEffect } from "react";

export default function TransactionModal({ isOpen, onClose, onSave, editingTx }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    description: "",
    category: "",
    amount: "",
    type: "expense",
  });

  useEffect(() => {
    if (editingTx) {
      setFormData(editingTx);
    } else {
      setFormData({
        date: new Date().toISOString().split("T")[0],
        description: "",
        category: "",
        amount: "",
        type: "expense",
      });
    }
  }, [editingTx, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      amount: Number(formData.amount)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl w-full max-w-md shadow-2xl transform transition-all">
        <h2 className="text-xl font-bold mb-4">
          {editingTx ? "Edit Transaction" : "Add Transaction"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input 
              type="date" required
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg bg-transparent dark:border-gray-700" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input 
              type="text" required placeholder="e.g. Groceries"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg bg-transparent dark:border-gray-700" 
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Category</label>
              <input 
                type="text" required placeholder="e.g. Food"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg bg-transparent dark:border-gray-700" 
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input 
                type="number" required min="1"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg bg-transparent dark:border-gray-700" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg bg-transparent dark:border-gray-700"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}