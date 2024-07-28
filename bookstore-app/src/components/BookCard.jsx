// src/components/BookCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css'; // Import CSS for styling

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <img src={book.image} alt={book.title} className="book-image" />
      <h3 className="book-title">{book.title}</h3>
      <p className="book-description">{book.description}</p>
      <Link to={`/book/${book.id}`} className="learn-more">Learn More</Link>
    </div>
  );
};

export default BookCard;
