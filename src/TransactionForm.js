import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function TransactionForm({ onTransactionAdded }) {
  const [transaction, setTransaction] = useState({
    date: "",
    description: "",
    category: "",
    amount: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8001/transactions", transaction, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        onTransactionAdded(response.data); // Update the list of transactions in the parent component
        setTransaction({
          date: "",
          description: "",
          category: "",
          amount: 0,
        });
      })
      .catch((error) => {
        console.error("Error while adding transaction:", error);
      });
  };

  return (
    <div>
      <h2>Add a New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="date"
          placeholder="Date"
          value={transaction.date}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={transaction.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={transaction.category}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={transaction.amount}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <button type="submit">Add Transaction</button>
        
      </form>
    </div>
  );
}

export default TransactionForm;
