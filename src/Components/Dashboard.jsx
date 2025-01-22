import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [topStock, setTopStock] = useState("");

  useEffect(() => {
    // Use dummy data instead of API call
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

    // Find top-performing stock0
    const top = dummyStocks.reduce((prev, current) => {
      return prev.currentPrice > current.currentPrice ? prev : current;
    });
    setTopStock(top.name);
  }, []);

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

  return (
    <div style={{ padding: "20px" }}>
      <header>
        <h1 class="header">Portfolio Tracker</h1>
      </header>
      <br/>

      <section class="portfolio-section">
        <div class="portfolio-info">
          <h2>Total Portfolio Value: ₹{portfolioValue.toFixed(2)}</h2>
          <h3>Top-Performing Stock: {topStock}</h3>
        </div>

        <div class="portfolio-chart" style={{ width: "400px", margin: "0 auto" }}>
          <h3>Portfolio Distribution</h3>
          <Pie data={pieData} />
        </div>
      </section>

      <section class="stock-list-section">
        <br/>
        <h3>Stock List</h3>
        <br/>
        <table class="stock-table">
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
                  <button class="edit-btn">Edit</button>
                  <button class="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;
