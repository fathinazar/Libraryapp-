// src/components/LeftSection.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaInfoCircle } from 'react-icons/fa'; // Import FaInfoCircle for About Us icon
import './LeftSection.css'; // Import CSS for styling

const LeftSection = () => {
  const location = useLocation();

  return (
    <div className="left-section">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        <FaHome className="icon" />
        Home
      </Link>
      <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
        <FaUser className="icon" />
        Profile
      </Link>
      <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
        <FaInfoCircle className="icon" />
        About
      </Link>
    </div>
  );
};

export default LeftSection;





// // src/components/LeftSection.jsx
// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FaHome, FaUser, FaInfoCircle, FaUsers, FaBook, FaPlus } from 'react-icons/fa';
// import './LeftSection.css';

// const LeftSection = ({ isAdmin }) => {
//   const location = useLocation();

//   if (isAdmin) {
//     return (
//       <div className="left-section">
//         <Link to="/admin/users" className={location.pathname === '/admin/users' ? 'active' : ''}>
//           <FaUsers className="icon" />
//           User Details
//         </Link>
//         <Link to="/admin/books" className={location.pathname === '/admin/books' ? 'active' : ''}>
//           <FaBook className="icon" />
//           Book Details
//         </Link>
//         <Link to="/admin/add-book" className={location.pathname === '/admin/add-book' ? 'active' : ''}>
//           <FaPlus className="icon" />
//           Add Book
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="left-section">
//       <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
//         <FaHome className="icon" />
//         Home
//       </Link>
//       <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
//         <FaUser className="icon" />
//         Profile
//       </Link>
//       <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
//         <FaInfoCircle className="icon" />
//         About
//       </Link>
//     </div>
//   );
// };

// export default LeftSection;