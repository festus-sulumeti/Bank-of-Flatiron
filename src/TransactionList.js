// src/components/TransactionList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";


function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch transactions from the API when the component mounts
    axios.get("http://localhost:8001/transactions").then((response) => {
      setTransactions(response.data);
    });
  }, []);

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
 

  return (
    <div>
      <h2>Search Transactions</h2>
      <input
        type="text"
        placeholder="Search transactions by description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>
              {typeof transaction.amount === "number"
                ? `$${transaction.amount.toFixed(2)}`
                : "Invalid Amount"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
