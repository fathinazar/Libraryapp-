// src/components/AdminLeftSection.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaBook, FaPlus } from 'react-icons/fa';
import './LeftSection.css';

const AdminLeftSection = () => {
  const location = useLocation();

  return (
    <div className="left-section">
      <Link to="/admin/users" className={location.pathname === '/admin/users' ? 'active' : ''}>
        <FaUsers className="icon" />
        User Details
      </Link>
      <Link to="/admin/books" className={location.pathname === '/admin/books' ? 'active' : ''}>
        <FaBook className="icon" />
        Book Details
      </Link>
      <Link to="/admin/add-book" className={location.pathname === '/admin/add-book' ? 'active' : ''}>
        <FaPlus className="icon" />
        Add Book
      </Link>
    </div>
  );
};

export default AdminLeftSection;