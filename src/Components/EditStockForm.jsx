import React, { useState } from "react";
import axios from "axios";

const EditStockForm = ({ stock, onUpdate, onCancel }) => {
  const [updatedStock, setUpdatedStock] = useState({
    quantity: stock.quantity,
    buyPrice: stock.buyPrice,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStock({ ...updatedStock, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("You must be logged in to perform this action.");
        return;
      }

      // Prepare the payload in the required format
      const payload = {
        ticker: stock.ticker, // Use the existing stock ticker
        name: stock.name, // Use the existing stock name
        quantity: Number(updatedStock.quantity), // Update the quantity
        buyPrice: Number(updatedStock.buyPrice), // Update the buy price
        purchaseDate: stock.purchaseDate, // Use the existing purchase date
        user: {
          id: stock.user_id, // Use the existing user ID
        },
      };

      // Make the PUT request to update the stock
      const response = await axios.put(
        `http://localhost:8080/api/stocks/${stock.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        `Stock with ID ${stock.id} updated successfully:`,
        response.data
      );

      // Call the onUpdate callback with the updated stock data
      onUpdate(response.data);
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update stock. Please try again.");
    }
  };

  return (
    <div className="edit-stock-modal">
      <form onSubmit={handleSubmit} className="edit-stock-form">
        <h3>Edit Stock</h3>

        {/* Quantity Field */}
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={updatedStock.quantity}
          onChange={handleChange}
          required
          min="1"
        />

        {/* Buy Price Field */}
        <label htmlFor="buyPrice">Buy Price</label>
        <input
          type="number"
          id="buyPrice"
          name="buyPrice"
          value={updatedStock.buyPrice}
          onChange={handleChange}
          required
          min="0.01"
          step="0.01"
        />

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="submit" className="save-btn">
            Save
          </button>
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStockForm;
