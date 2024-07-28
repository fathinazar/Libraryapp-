


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBook, FaSignOutAlt, FaUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const handleLogout = () => {
    setShowConfirmLogout(true);
  };

  const confirmLogout = () => {
    onLogout();
    setShowConfirmLogout(false);
    setShowLogoutAlert(true);
    navigate('/');

    setTimeout(() => {
      setShowLogoutAlert(false);
    }, 5000);
  };

  const cancelLogout = () => {
    setShowConfirmLogout(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <h1>
            <FaBook className="navbar-icon" /> Bookstore
          </h1>
        </div>
        <div className="navbar-right">
          <Link to="/">Home</Link>
          {isAuthenticated ? (
            <>
              {/* <Link to="/profile"><FaUser className="navbar-icon" /> Profile</Link> */}
              <button className="logout-button" onClick={handleLogout}>
                <FaSignOutAlt className="navbar-icon" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>

      {showConfirmLogout && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to logout?</p>
            <button onClick={confirmLogout}>Yes</button>
            <button onClick={cancelLogout}>No</button>
          </div>
        </div>
      )}

      {showLogoutAlert && (
        <div className="logout-alert">
          <p>Logged out successfully</p>
        </div>
      )}
    </>
  );
};

export default Navbar;