import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="container flex-between">
        <div>
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            📋 Assignment Tracker
          </Link>
        </div>

        <div className="flex">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/assignments">Assignments</Link>
              <Link to="/create-assignment">New Assignment</Link>
              <span>Welcome, {user?.name}</span>
              <button onClick={handleLogout} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
