import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./assets/adminLogin.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.role === "CUSTOMER") {
          navigate("/customerhome");
        } else if (data.role === "ADMIN") {
          navigate("/admindashboard");
        } else {
          navigate("/admin"); // Redirect to a default page if role is unknown
        }
      } else {
        const errorMessage =
          data.error || "Something went wrong. Please try again.";
        throw new Error(errorMessage);
      }
    } catch (err) {
      setError(err.message || "Unexpected error occurred");
    }
  };

  return (
    <div className="page-layout">
      <div className="page-container1">
        <div className="form-container">
          <h1 className="form-title">Admin Login</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSignIn} className="form-content">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Enter Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="form-button">
              Enter As Admin
            </button>
          </form>
          <div className="form-footer">
            <a href="/login" className="form-link">
              Not Admin? Login As User ! 
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}