import React from "react";

const DeleteConfirmation = ({ stock, onDelete, onCancel }) => {
  return (
    <div className="delete-confirmation-modal">
      <div className="delete-confirmation-box">
        <h3>Delete Stock</h3>
        <p>Are you sure you want to delete the stock <strong>{stock.name}</strong>?</p>
        <div className="form-actions">
          <button className="yes-btn" onClick={() => onDelete(stock.ticker)}>
            Yes
          </button>
          <button className="no-btn" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
