// src/components/AdminNavbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminNavbar.css'; // You'll need to create this CSS file

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <nav className="admin-navbar">
      <Link to="/" className="home-button">Home</Link>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </nav>
  );
};

export default AdminNavbar;