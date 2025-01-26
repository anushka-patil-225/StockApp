import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import StockForm from "./StockForm";
import EditStockForm from "./EditStockForm";
import DeleteConfirmation from "./DeleteConfirmation";
import Footer from "./Footer";


// Register required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [topStock, setTopStock] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockToDelete, setStockToDelete] = useState(null);


  useEffect(() => {
    const dummyStocks = [
      { name: "Apple", ticker: "AAPL", quantity: 10, buyPrice: 150, currentPrice: 170 },
      { name: "Tesla", ticker: "TSLA", quantity: 5, buyPrice: 600, currentPrice: 650 },
      { name: "Google", ticker: "GOOGL", quantity: 8, buyPrice: 2800, currentPrice: 2900 },
      { name: "Amazon", ticker: "AMZN", quantity: 12, buyPrice: 3400, currentPrice: 3500 },
      { name: "Microsoft", ticker: "MSFT", quantity: 6, buyPrice: 300, currentPrice: 310 },
    ];

    setStocks(dummyStocks);

    // Calculate total portfolio value
    const totalValue = dummyStocks.reduce((sum, stock) => {
      return sum + stock.quantity * stock.currentPrice;
    }, 0);
    setPortfolioValue(totalValue);

    // Find top-performing stock
    const top = dummyStocks.reduce((prev, current) => {
      return prev.currentPrice > current.currentPrice ? prev : current;
    });
    setTopStock(top.name);
  }, []);

  const handleEdit = (stock) => {
    setSelectedStock(stock);
    setIsEditing(true);
  };

  const handleUpdateStock = (updatedStock) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.ticker === updatedStock.ticker ? updatedStock : stock
      )
    );
    setIsEditing(false);
    setSelectedStock(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedStock(null);
  };

  const handleDeleteStock = (ticker) => {
    setStocks((prev) => prev.filter((stock) => stock.ticker !== ticker));
    setStockToDelete(null);
  };

  // Data for the Pie Chart
  const pieData = {
    labels: stocks.map((stock) => stock.name),
    datasets: [
      {
        label: "Portfolio Distribution",
        data: stocks.map((stock) => stock.quantity * stock.currentPrice),
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (<div>
    <div style={{ padding: "20px" }}>
      <br />
      <section className="portfolio-section">
        <StockForm />

        <div className="portfolio-chart">
          <div className="portfolio-info">
            <h1>Total Portfolio Value: ₹{portfolioValue.toFixed(2)}</h1>
            <h1>Top-Performing Stock: {topStock}</h1>
          </div>
          <br />
          <h3>Portfolio Distribution</h3>
          <Pie data={pieData} />
        </div>
      </section>

      <section className="stock-list-section">
        <br />
        <h3>Stock List</h3>
        <br />
        <table className="stock-table">
          <thead>
            <tr>
              <th>Stock Name</th>
              <th>Ticker</th>
              <th>Quantity</th>
              <th>Buy Price</th>
              <th>Current Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.ticker}>
                <td>{stock.name}</td>
                <td>{stock.ticker}</td>
                <td>{stock.quantity}</td>
                <td>₹{stock.buyPrice.toFixed(2)}</td>
                <td>₹{(stock.quantity * stock.currentPrice).toFixed(2)}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(stock)}
                  >Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => setStockToDelete(stock)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {isEditing && (
        <EditStockForm
          stock={selectedStock}
          onUpdate={handleUpdateStock}
          onCancel={handleCancelEdit}
        />
      )}

{stockToDelete && (
        <DeleteConfirmation
          stock={stockToDelete}
          onDelete={handleDeleteStock}
          onCancel={() => setStockToDelete(null)}
        />
      )}
      
    </div>

    <div>
      <Footer/>
    </div>
    </div>
  );
};

export default Dashboard;