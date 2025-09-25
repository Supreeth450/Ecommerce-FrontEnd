// src/components/CategoryNavigation.jsx
import React from "react";
import "./assets/categoryNavigation.css";

export function CategoryNavigation({ onCategoryClick }) {
  const categories = ['Shirts', 'Pants', 'Accessories', 'Mobiles', 'Mobile Accessories'];

  return (
    <div className="category-wrapper">
      <nav className="category-navigation">
        <ul className="category-list">
          {categories.map((category, index) => (
            <li
              key={index}
              className="category-item"
              onClick={() => onCategoryClick(category)}
              
            >
              <span className="category-text">{category}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

