import React, { useState, useEffect } from "react";

const StockForm = ({ onSave, stockToEdit, onCancel }) => {
  // Initial form state
  const initialFormState = {
    name: "",
    ticker: "",
    quantity: "",
    buyPrice: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  // Populate form data when editing an existing stock
  useEffect(() => {
    if (stockToEdit) {
      setFormData(stockToEdit);
    }
  }, [stockToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (!formData.name || !formData.ticker || !formData.quantity || !formData.buyPrice) {
      alert("Please fill out all fields.");
      return;
    }

    if (Number(formData.quantity) <= 0 || Number(formData.buyPrice) <= 0) {
      alert("Quantity and Buy Price must be positive values.");
      return;
    }

    // Call parent onSave function with form data
    onSave({ ...formData, quantity: Number(formData.quantity), buyPrice: Number(formData.buyPrice) });

    // Reset form after submission
    setFormData(initialFormState);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center">
      <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {stockToEdit ? "Edit Stock" : "Add Stock"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Stock Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
              Stock Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., Apple Inc."
              required
            />
          </div>

          {/* Ticker */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="ticker">
              Ticker Symbol
            </label>
            <input
              type="text"
              id="ticker"
              name="ticker"
              value={formData.ticker}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., AAPL"
              required
            />
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., 10"
              required
              min="1"
            />
          </div>

          {/* Buy Price */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="buyPrice">
              Buy Price ($)
            </label>
            <input
              type="number"
              id="buyPrice"
              name="buyPrice"
              value={formData.buyPrice}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., 150.00"
              required
              min="0.01"
              step="0.01"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                onCancel?.();
                setFormData(initialFormState); // Reset the form on cancel
              }}
              className="px-6 py-2 text-sm font-semibold text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {stockToEdit ? "Save Changes" : "Add Stock"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockForm;
