// ExpenseForm.js
import React, { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ onAddExpense, categories }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(categories[0]);

  const handleAddExpense = () => {
    if (name && price) {
      const newExpense = {
        id: Date.now(),
        name,
        price: parseFloat(price),
        category,
      };
      onAddExpense(newExpense);
      setName('');
      setPrice('');
      setCategory(categories[0]);
    }
  };

  return (
    <div className="expense-form">
      <label>
        Product Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleAddExpense}>Add</button>
    </div>
  );
};

export default ExpenseForm;
