import React, { useState, useEffect } from "react";
import "./App.css";
import TransactionList from "./TransactionList";
import TransactionForm from "./TransactionForm";
import TransactionSearch from "./TransactionSearch";
import axios from "axios";


function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions from the API when the component mounts
    axios.get("http://localhost:8001/transactions").then((response) => {
      setTransactions(response.data);
    });
  }, []);

  const handleTransactionAdded = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const handleSearch = (searchTerm) => {
    // Implement search functionality by setting searchTerm state
    const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Update the state to display the filtered transactions
    setTransactions(filteredTransactions);
  };

  return (
    <div className="wrapper">
      <TransactionSearch onSearch={handleSearch} />
      <br />
      <TransactionForm onTransactionAdded={handleTransactionAdded} />
      <br />
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App;
