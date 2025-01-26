import React, { useState, useEffect } from "react";
import axios from "axios";

const StockForm = ({ onSave, stockToEdit, onCancel, userId }) => {
  const initialFormState = {
    name: "",
    ticker: "",
    quantity: "",
    buyPrice: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isTickerFilled, setIsTickerFilled] = useState(false);

  useEffect(() => {
    if (stockToEdit) {
      setFormData(stockToEdit);
    }
  }, [stockToEdit]);

  useEffect(() => {
    if (formData.name && formData.ticker) {
      setIsTickerFilled(true);
    } else {
      setIsTickerFilled(false);
    }
  }, [formData.name, formData.ticker]);

  useEffect(() => {
    if (isTickerFilled) {
      fetchStockPrice(formData.ticker);
    }
  }, [isTickerFilled, formData.ticker]);

  const fetchStockPrice = async (ticker) => {
    try {
      const response = await axios.get(`https://www.alphavantage.co/query`, {
        params: {
          function: "GLOBAL_QUOTE",
          symbol: ticker,
          apikey: "YOUR_API_KEY", // Replace with your API key
        },
      });

      if (response.data["Global Quote"]) {
        const latestPrice = response.data["Global Quote"]["05. price"];
        setFormData((prevData) => ({
          ...prevData,
          buyPrice: latestPrice,
        }));
      } else {
        alert("Unable to fetch stock price");
      }
    } catch (error) {
      console.error("Error fetching stock price:", error);
      // alert("Unable to fetch stock price");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.ticker ||
      !formData.quantity ||
      !formData.buyPrice
    ) {
      alert("Please fill out all fields.");
      return;
    }

    if (Number(formData.quantity) <= 0 || Number(formData.buyPrice) <= 0) {
      alert("Quantity and Buy Price must be positive values.");
      return;
    }

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("You must be logged in to perform this action.");
        return;
      }

      // Get the current date as purchaseDate
      const purchaseDate = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD

      // Prepare the payload
      const payload = {
        name: formData.name,
        ticker: formData.ticker,
        quantity: Number(formData.quantity),
        buyPrice: Number(formData.buyPrice),
        purchaseDate: purchaseDate,
        user: {
          id: Number(userId), // Use the id prop passed from the parent
        },
      };

      // Make API call to save stock
      const response = await axios.post(
        "http://localhost:8080/api/stocks",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Stock saved successfully:", response.data);

      // Call parent onSave function with response data
      onSave(response.data);

      // Reset form after submission
      setFormData(initialFormState);
    } catch (error) {
      console.error("Error saving stock:", error);
    }
  };

  return (
    <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {stockToEdit ? "Edit Stock" : "Add Stock"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="name"
          >
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="ticker"
          >
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="quantity"
          >
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="buyPrice"
          >
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
            readOnly
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => {
              onCancel?.();
              setFormData(initialFormState);
            }}
            className="px-6 py-2 text-sm font-semibold text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            style={{ backgroundColor: "rgb(3, 123, 102)" }}
            type="submit"
            className="px-6 py-2 text-sm font-semibold text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {stockToEdit ? "Save Changes" : "Add Stock"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockForm;
