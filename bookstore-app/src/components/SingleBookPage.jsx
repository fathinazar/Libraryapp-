import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LeftSection from './LeftSection';
import { FaThumbsUp } from 'react-icons/fa';
import './SingleBookPage.css';

const SingleBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [liked, setLiked] = useState(false);
  const [userComment, setUserComment] = useState('');
  const [bookComments, setBookComments] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(response.data);
        setBookComments(response.data.comments || []);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/books/${id}/${liked ? 'unlike' : 'like'}`);
      setBook({ ...book, likes: response.data.likes });
      setLiked(!liked);
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const handleCommentChange = (e) => {
    setUserComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = { id: Date.now(), email: 'currentuser@example.com', text: userComment };
    setBookComments([...bookComments, newComment]);
    setUserComment('');
  };

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="single-book-page">
      <div className="main-content">
        <LeftSection />
        <div className="book-details">
          <h1>{book.title}</h1>
          <div className="book-image-container">
            <img src={book.image} alt={book.title} className="book-image" />
          </div>
          <p className="book-id">Book ID: {book.id}</p>
          <p className="book-author">Author: {book.author}</p>
          <p className="book-publication-year">Publication Year: {book.publicationYear}</p>
          <p className="book-genre">Genre: {book.genre}</p>
          <p className="book-isbn">ISBN: {book.isbn}</p>
          <p className="book-availability">
            Availability: {book.isAvailable ? 'Available' : 'Rented'}
          </p>
          <div className="book-actions">
            <button
              className={`like-button ${liked ? 'active' : ''}`}
              onClick={handleLike}
            >
              <FaThumbsUp /> {book.likes} Like
            </button>
          </div>
          <p className="book-description">{book.description}</p>
          <div className="comments-section">
            <h2>Comments</h2>
            <div className="comments-list">
              {bookComments.map((comment) => (
                <div key={comment.id} className="comment">
                  <p className="comment-email">{comment.email}</p>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))}
            </div>
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <textarea
                value={userComment}
                onChange={handleCommentChange}
                placeholder="Add your comment..."
                rows="4"
              />
              <button type="submit">Submit Comment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBookPage;
