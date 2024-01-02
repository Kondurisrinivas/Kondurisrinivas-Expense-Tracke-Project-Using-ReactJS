// ExpenseListApp.js
import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseItem from './ExpenseItem';
import './ExpenseListApp.css';

const ExpenseListApp = () => {
  const [expenses, setExpenses] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(true);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(storedExpenses);
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
    setIsFormVisible(true);
  };

  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const handleEditExpense = (id, updatedExpense) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === id ? { ...expense, ...updatedExpense } : expense
    );
    setExpenses(updatedExpenses);
  };

  const categories = ['Bills', 'Shopping', 'Travel', 'Insurance', 'Entertainment'];

  return (
    <div className="expense-list-app">
      <h1>Expense List App</h1>
      {isFormVisible && <ExpenseForm onAddExpense={handleAddExpense} categories={categories} />}
      <div className="list-container">
        <ul>
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              categories={categories}
              onDelete={handleDeleteExpense}
              onEdit={handleEditExpense}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseListApp;
