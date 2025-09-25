// src/components/Footer.jsx
import React from "react";
import "./assets/Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left side branding */}
        <div className="footer-left">
          <h3 className="footer-title">SalesSavvy</h3>
          <p className="footer-tagline">Your one-stop shop for all your needs</p>
        </div>

        {/* Footer links */}
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>

      {/* Bottom note */}
      <div className="footer-bottom">
        <p>© 2025 SalesSavvy. All rights reserved.</p>
      </div>
    </footer>
  );
}
