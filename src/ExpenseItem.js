// ExpenseItem.js
import React, { useState } from 'react';
import './ExpenseItem.css';

const ExpenseItem = ({ expense, categories, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(expense.name);
  const [editedPrice, setEditedPrice] = useState(parseFloat(expense.price) || '');
  const [editedCategory, setEditedCategory] = useState(expense.category);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(expense.name);
    setEditedPrice(parseFloat(expense.price) || '');
    setEditedCategory(expense.category);
  };

  const handleSaveEdit = () => {
    onEdit(expense.id, {
      name: editedName,
      price: parseFloat(editedPrice) || 0,
      category: editedCategory,
    });
    setIsEditing(false);
  };

  return (
    <li className="expense-item">
      <div className="expense-details">
        <span>
          <b> Product:  </b>
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          ) : (
            expense.name
          )}
        </span>
        <span>
          <b>  Price: </b>
          {isEditing ? (
            <input
              type="number"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
            />
          ) : (
            `₹ ${parseFloat(expense.price)}`
          )}
        </span>
        <span>
          <b>  Category: </b>
          {isEditing ? (
            <select
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          ) : (
            expense.category
          )}
        </span>
      </div>

      <div className="expense-item-buttons">
        {isEditing ? (
          <>
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <button className="edit-button" onClick={handleEditClick}>
              Edit
            </button>
            <button className="delete-button" onClick={() => onDelete(expense.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default ExpenseItem;
