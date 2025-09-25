import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './assets/profileInfo.css';
import Logo from './Logo';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 🔙 for back navigation
    const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/profile/info`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Unauthorized or failed to fetch profile");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p className="loading">⏳ Loading profile...</p>;
  }

  if (!user) {
    return <p className="not-authorized">❌ Not authorized</p>;
  }

  return (
    <div className="profile-container">
     <div className="auth-page-logo">
                          <Logo />
                      </div>
      {/* Back Button */}
      <button 
        className="back-btn" 
        onClick={() => navigate(-1)}
      >
        ⬅ Back
      </button>

      {/* Top Banner */}
      <div className="profile-banner">
        <img
          src={`https://ui-avatars.com/api/?name=${user.user_name}&background=random&color=fff&bold=true`}
          alt="User Avatar"
          className="profile-avatar"
        />
        <h1 className="profile-username">{user.user_name}</h1>
        <span className="profile-role">{user.role}</span>
      </div>

      {/* Details Card */}
      <div className="profile-card">
        <h2 className="card-title">👤 Profile Details</h2>
        <div className="card-content">
          <p><strong>📧 Email:</strong> {user.email}</p>
          <p><strong>🎭 Role:</strong> {user.role}</p>
          <p><strong>📅 Member since:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}
