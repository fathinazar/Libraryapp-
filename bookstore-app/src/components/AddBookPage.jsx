// src/components/AddBookPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddBookPage.css';

const AddBookPage = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    description: '',
    image: '',
    author: '',
    publicationYear: '',
    genre: '',
    isbn: ''
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/admin/books', book);
//       alert('Book added successfully!');
//       navigate('/');
//     } catch (error) {
//       console.error('Error adding book:', error);
//       alert('Error adding book. Please try again.');
//     }
//   };
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      await axios.post('http://localhost:5000/api/admin/books', book, {
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the request headers
        }
      });
      alert('Book added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error adding book:', error);
      if (error.response && error.response.status === 401) {
        alert('Unauthorized. Please log in again.');
        // Optionally, redirect to login page
        // navigate('/login');
      } else {
        alert('Error adding book. Please try again.');
      }
    }
  };

  return (
    <div className="add-book-page">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={book.description}
          onChange={handleChange}
          placeholder="Description"
          required
        ></textarea>
        <input
          type="text"
          name="image"
          value={book.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        <input
          type="number"
          name="publicationYear"
          value={book.publicationYear}
          onChange={handleChange}
          placeholder="Publication Year"
          required
        />
        <input
          type="text"
          name="genre"
          value={book.genre}
          onChange={handleChange}
          placeholder="Genre"
          required
        />
        <input
          type="text"
          name="isbn"
          value={book.isbn}
          onChange={handleChange}
          placeholder="ISBN"
          required
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;