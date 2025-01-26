import React, { useState } from 'react';

const EditStockForm = ({ stock, onUpdate, onCancel }) => {
  const [updatedStock, setUpdatedStock] = useState({ ...stock });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStock({ ...updatedStock, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedStock);
  };

  return (
    <div className="edit-stock-modal">
      <form onSubmit={handleSubmit} className="edit-stock-form">
        <h3>Edit Stock</h3>

        <label htmlFor="name">Stock Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={updatedStock.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="ticker">Ticker</label>
        <input
          type="text"
          id="ticker"
          name="ticker"
          value={updatedStock.ticker}
          onChange={handleChange}
          required
          disabled
        />

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

        

        <div className="form-actions">
          <button type="submit" className="save-btn">Save</button>
          <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditStockForm;
