// src/components/ProductList.jsx
import React from "react";
import "./assets/productList.css";

export function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div className="no-products-wrapper">
        <p className="no-products">No products available.</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.product_id} className="product-card">
            <div className="product-image-wrapper">
              <img
                src={product.images[0]}
                alt={product.name}
                className="product-image"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">₹{product.price}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => onAddToCart(product.product_id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
