import React from "react";
import axios from "axios";

const DeleteConfirmation = ({ stock, onDelete, onCancel }) => {
  const handleDelete = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("You must be logged in to perform this action.");
        return;
      }

      // Make the DELETE request to the backend
      await axios.delete(`http://localhost:8080/api/stocks/${stock.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(`Stock with ID ${stock.id} deleted successfully.`);

      // Call the onDelete callback to update the parent state
      onDelete(stock.id);
    } catch (error) {
      console.error("Error deleting stock:", error);
      alert("Failed to delete stock. Please try again.");
    }
  };

  return (
    <div className="delete-confirmation-modal">
      <div className="delete-confirmation-box">
        <h3>Delete Stock</h3>
        <p>
          Are you sure you want to delete the stock{" "}
          <strong>{stock.name}</strong>?
        </p>
        <div className="form-actions">
          <button className="yes-btn" onClick={handleDelete}>
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
