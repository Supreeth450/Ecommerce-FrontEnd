import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./assets/profiledropdown.css";

export function ProfileDropdown({ username }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('User successfully logged out');
        navigate('/');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleProfileClick = () => {
    navigate('/profilePage');
  };

  const handleOrdersClick = () => {
    navigate('/orderPage');
  };

  return (
    <div className="profile-dropdown">
      <button className="profile-button" onClick={toggleDropdown}>
        {username ? (
          <div className="avatar-circle">
            {username.charAt(0).toUpperCase()}
          </div>
        ) : (
         <div className="avatar-circle">G</div> 
        )}
        
        <span className="username">{username || 'Guest'}</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <a onClick={handleProfileClick}>Profile</a>
          <a onClick={handleOrdersClick}>Orders</a>
          <button className="profile-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );


 

}
