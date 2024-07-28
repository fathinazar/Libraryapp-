// import React from 'react';
// import { Link, Outlet, useNavigate } from 'react-router-dom';

// const AdminLayout = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     localStorage.removeItem('userRole');
//     navigate('/login');
//   };

//   return (
//     <div className="admin-layout">
//       <nav className="admin-navbar">
//         <Link to="/">Home</Link>
//         <Link to="/admin/dashboard">Dashboard</Link>
//         <button onClick={handleLogout}>Logout</button>
//       </nav>
//       <div className="admin-content">
//         <aside className="admin-sidebar">
//           <Link to="/admin/users">User Details</Link>
//           <Link to="/admin/books">Book Details</Link>
//           <Link to="/admin/add-book">Add Book</Link>
//         </aside>
//         <main className="admin-main-content">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;




import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      <nav className="admin-navbar">
        <Link to="/" className="home-button">Home</Link>
        <h1 className="admin-title">Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </nav>
      <div className="admin-content">
        <aside className="admin-sidebar">
          <Link to="/admin/users" className="sidebar-button">User Details</Link>
          <Link to="/admin/books" className="sidebar-button">Book Details</Link>
          <Link to="/admin/add-book" className="sidebar-button">Add Book</Link>
        </aside>
        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;