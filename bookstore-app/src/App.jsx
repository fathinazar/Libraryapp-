



// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import SingleBookPage from './components/SingleBookPage';
import PrivateRoute from './PrivateRoute';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import AdminDashboard from './components/AdminDashboard';
import LeftSection from './components/LeftSection';
import AdminLeftSection from './components/AdminLeftSection';
import AddBookPage from './components/AddBookPage';

const App = () => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    userRole: null
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    setAuth({
      isAuthenticated: !!token,
      userRole: role
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setAuth({
      isAuthenticated: false,
      userRole: null
    });
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar isAuthenticated={auth.isAuthenticated} onLogout={handleLogout} />
        <div className="content-container">
          {auth.isAuthenticated && (
            auth.userRole === 'admin' ? <AdminLeftSection /> : <LeftSection />
          )}
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/signup" element={<SignupPage setAuth={setAuth} />} />
              <Route path="/login" element={<LoginPage setAuth={setAuth} />} />
              <Route path="/" element={<PrivateRoute isAuthenticated={auth.isAuthenticated} />}>
                <Route path="/book/:id" element={<SingleBookPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                {/* <Route
                  path="/admin/dashboard"
                  element={
                    auth.userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/profile" />
                    
                  }
                /> */}
                  {auth.userRole === 'admin' && (
                  <>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/add-book" element={<AddBookPage />} />
                  </>
                )}
              </Route>
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;







