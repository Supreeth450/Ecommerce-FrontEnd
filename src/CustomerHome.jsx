
import React, { useState, useEffect } from 'react';
import { CategoryNavigation } from './CategoryNavigation';
import { ProductList } from './ProductList';
import { Footer } from './Footer';
import { Header } from './Header';
import './assets/customerHome.css';

export default function CustomerHomePage() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState('');
  const [cartError, setCartError] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchProducts();
    if (username) {
      fetchCartCount();
    }
  }, [username]);

  useEffect(() => {
    // whenever products or searchQuery changes, filter them
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  const fetchProducts = async (category = '') => {
    try {
      const response = await fetch(
        `http://localhost:9090/api/products${
          category ? `?category=${category}` : '?category=Shirts'
        }`,
        { credentials: 'include' }
      );
      const data = await response.json();
      if (data) {
        setUsername(data.user?.name || 'Guest');
        setProducts(data.products || []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  const fetchCartCount = async () => {
    setIsCartLoading(true);
    try {
      const response = await fetch(
        `${API_BASE}/api/cart/items/count?username=${username}`,
        {
          credentials: 'include',
        }
      );
      const count = await response.json();
      setCartCount(count);
      setCartError(false);
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartError(true);
    } finally {
      setIsCartLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    fetchProducts(category);
  };

  const handleAddToCart = async (productId) => {
    if (!username) {
      console.error('Username is required to add items to the cart');
      return;
    }
    try {
      const response = await fetch(`${API_BASE}/api/cart/add`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ username, productId}),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        fetchCartCount();
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="customer-homepage">
      <Header
        cartCount={isCartLoading ? '...' : cartError ? 'Error' : cartCount}
        username={username}
      />

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

      <div className="homepage-wrapper">
        <nav className="navigation">
          <CategoryNavigation onCategoryClick={handleCategoryClick} />
        </nav>

      

        <main className="main-content">
          <div className="products-section">
            <h2 className="section-title">Featured Products</h2>
            <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
