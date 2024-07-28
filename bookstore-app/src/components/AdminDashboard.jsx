// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const [activeSection, setActiveSection] = useState('userDetails');
//   const [users, setUsers] = useState([]);
//   const [books, setBooks] = useState([]);
//   const navigate = useNavigate();

//   const [bookForm, setBookForm] = useState({
//     title: '',
//     description: '',
//     image: '',
//     author: '',
//     publicationYear: '',
//     genre: '',
//     isbn: ''
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('adminToken');
//     if (!token) {
//       navigate('/login');
//     } else {
//       fetchUsers();
//       fetchBooks();
//     }
//   }, [navigate]);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/admin/users', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
//       });
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       if (error.response && error.response.status === 401) {
//         localStorage.removeItem('adminToken');
//         navigate('/login');
//       }
//     }
//   };

//   const fetchBooks = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/admin/books', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
//       });
//       setBooks(response.data);
//     } catch (error) {
//       console.error('Error fetching books:', error);
//       if (error.response && error.response.status === 401) {
//         localStorage.removeItem('adminToken');
//         navigate('/login');
//       }
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     navigate('/login');
//   };

//   const handleBlockUser = async (userId) => {
//     try {
//       await axios.put(`http://localhost:5000/api/admin/users/${userId}/block`, {}, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
//       });
//       fetchUsers();
//     } catch (error) {
//       console.error('Error blocking user:', error);
//     }
//   };

//   const handleDeleteComment = async (bookId, commentId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/books/${bookId}/comments/${commentId}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
//       });
//       fetchBooks();
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//     }
//   };

//   const handleAddBook = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/admin/books', bookForm, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
//       });
//       fetchBooks();
//       setBookForm({
//         title: '',
//         description: '',
//         image: '',
//         author: '',
//         publicationYear: '',
//         genre: '',
//         isbn: ''
//       });
//     } catch (error) {
//       console.error('Error adding book:', error);
//     }
//   };

//   const handleRemoveBook = async (bookId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/books/${bookId}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
//       });
//       fetchBooks();
//     } catch (error) {
//       console.error('Error removing book:', error);
//     }
//   };

//   const handleUpdateBook = async (bookId) => {
//     try {
//       await axios.put(`http://localhost:5000/api/admin/books/${bookId}`, bookForm, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
//       });
//       fetchBooks();
//     } catch (error) {
//       console.error('Error updating book:', error);
//     }
//   };

//   const renderSection = () => {
//     switch (activeSection) {
//       case 'userDetails':
//         return (
//           <div>
//             <h2>User Details</h2>
//             {users.map(user => (
//               <div key={user._id}>
//                 <p>{user.name} - {user.email}</p>
//                 <button onClick={() => handleBlockUser(user._id)}>
//                   {user.isBlocked ? 'Unblock' : 'Block'} User
//                 </button>
//               </div>
//             ))}
//           </div>
//         );
//       case 'addBook':
//         return (
//           <div>
//             <h2>Add Book</h2>
//             <form onSubmit={handleAddBook}>
//               {Object.keys(bookForm).map(key => (
//                 <input
//                   key={key}
//                   type={key === 'publicationYear' ? 'number' : 'text'}
//                   name={key}
//                   value={bookForm[key]}
//                   onChange={(e) => setBookForm({...bookForm, [key]: e.target.value})}
//                   placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//                   required
//                 />
//               ))}
//               <button type="submit">Add Book</button>
//             </form>
//           </div>
//         );
//       case 'removeBook':
//         return (
//           <div>
//             <h2>Remove Book</h2>
//             {books.map(book => (
//               <div key={book._id}>
//                 <p>{book.title}</p>
//                 <button onClick={() => handleRemoveBook(book._id)}>Remove</button>
//               </div>
//             ))}
//           </div>
//         );
//       case 'updateBook':
//         return (
//           <div>
//             <h2>Update Book</h2>
//             {books.map(book => (
//               <div key={book._id}>
//                 <p>{book.title}</p>
//                 <button onClick={() => {
//                   setBookForm(book);
//                   handleUpdateBook(book._id);
//                 }}>Update</button>
//               </div>
//             ))}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <nav className="left-panel">
//         <button onClick={() => setActiveSection('userDetails')}>User Details</button>
//         <button onClick={() => setActiveSection('addBook')}>Add Book</button>
//         <button onClick={() => setActiveSection('removeBook')}>Remove Book</button>
//         <button onClick={() => setActiveSection('updateBook')}>Update Book</button>
//       </nav>
//       <main>
//         <header>
//           <h1>Admin Dashboard</h1>
//           <button onClick={() => navigate('/')}>Home</button>
//           <button onClick={handleLogout}>Logout</button>
//         </header>
//         {renderSection()}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;







import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('userDetails');
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const [bookForm, setBookForm] = useState({
    title: '',
    description: '',
    image: '',
    author: '',
    publicationYear: '',
    genre: '',
    isbn: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
    } else {
      fetchUsers();
      fetchBooks();
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/login');
      }
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/books', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/login');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const handleBlockUser = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/users/${userId}/block`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleDeleteComment = async (bookId, commentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/books/${bookId}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchBooks();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/books', bookForm, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchBooks();
      setBookForm({
        title: '',
        description: '',
        image: '',
        author: '',
        publicationYear: '',
        genre: '',
        isbn: ''
      });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleRemoveBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/books/${bookId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchBooks();
    } catch (error) {
      console.error('Error removing book:', error);
    }
  };

  const handleUpdateBook = async (bookId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/books/${bookId}`, bookForm, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  
  const renderSection = () => {
    switch (activeSection) {
      case 'userDetails':
        return (
          <div>
            <h2>User Details</h2>
            {users.map(user => (
              <div key={user._id}>
                <p>{user.name} - {user.email}</p>
                <button onClick={() => handleBlockUser(user._id)}>
                  {user.isBlocked ? 'Unblock' : 'Block'} User
                </button>
              </div>
            ))}
          </div>
        );
      case 'bookDetails':
        return (
          <div>
            <h2>Book Details</h2>
            {books.map(book => (
              <div key={book._id}>
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>ISBN: {book.isbn}</p>
                <p>Genre: {book.genre}</p>
                <button onClick={() => handleRemoveBook(book._id)}>Remove</button>
                <button onClick={() => {
                  setBookForm(book);
                  setActiveSection('updateBook');
                }}>Update</button>
              </div>
            ))}
          </div>
        );
      case 'addBook':
        return (
          <div>
            <h2>Add Book</h2>
            <form onSubmit={handleAddBook}>
              {Object.keys(bookForm).map(key => (
                <input
                  key={key}
                  type={key === 'publicationYear' ? 'number' : 'text'}
                  name={key}
                  value={bookForm[key]}
                  onChange={(e) => setBookForm({...bookForm, [key]: e.target.value})}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  required
                />
              ))}
              <button type="submit">Add Book</button>
            </form>
          </div>
        );
      case 'updateBook':
        return (
          <div>
            <h2>Update Book</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdateBook(bookForm._id);
            }}>
              {Object.keys(bookForm).map(key => (
                key !== '_id' && (
                  <input
                    key={key}
                    type={key === 'publicationYear' ? 'number' : 'text'}
                    name={key}
                    value={bookForm[key]}
                    onChange={(e) => setBookForm({...bookForm, [key]: e.target.value})}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    required
                  />
                )
              ))}
              <button type="submit">Update Book</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      <nav className="admin-navbar">
        <Link to="/">Home</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div className="dashboard-content">
        <aside className="side-panel">
          <button onClick={() => setActiveSection('userDetails')}>User Details</button>
          <button onClick={() => setActiveSection('bookDetails')}>Book Details</button>
          <button onClick={() => setActiveSection('addBook')}>Add Book</button>
        </aside>
        <main>
          <h1>Admin Dashboard</h1>
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;