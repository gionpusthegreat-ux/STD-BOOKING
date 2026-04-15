import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          📷 Studio Booking System
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/studios" className="nav-link">Studios</Link>

          {isAuthenticated ? (
            <>
              {user?.userType === 'studio_owner' && (
                <Link to="/owner-dashboard" className="nav-link">My Studios</Link>
              )}
              {user?.userType === 'customer' && (
                <Link to="/my-bookings" className="nav-link">My Bookings</Link>
              )}
              <span className="nav-user">👤 {user?.name}</span>
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link register-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
