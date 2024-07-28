// const express = require('express');
// const router = express.Router();

// // Dummy data for now
// const books = Array.from({ length: 20 }, (_, index) => ({
//   id: index + 1,
//   title: `Book Title ${index + 1}`,
//   description: `This is a short description of Book Title ${index + 1}.`,
//   image: 'https://images.squarespace-cdn.com/content/v1/59c82ac46f4ca30b86d179bf/1706362642426-BI3J8PJ5LRJNO8H7WFV4/119.bookreview.AtomicHabits.jpg',
//   author: 'John Doe',
//   publicationYear: 2021,
//   genre: 'Fiction',
//   isbn: '123-456-789',
//   isAvailable: true,
//   likes: Math.floor(Math.random() * 100), // Random number of likes
//   comments: [
//     { id: 1, email: 'user1@example.com', text: 'Great book!' },
//     { id: 2, email: 'user2@example.com', text: 'Very informative.' },
//     { id: 3, email: 'user3@example.com', text: 'Great book!' },
//     { id: 4, email: 'user4@example.com', text: 'Very informative.' },
//     { id: 5, email: 'user5@example.com', text: 'Great book!' },
//     { id: 6, email: 'user6@example.com', text: 'Very informative.' }
//   ]
// }));

// router.get('/', (req, res) => {
//   res.json(books);
// });

// router.get('/:id', (req, res) => {
//   const bookId = parseInt(req.params.id, 10);
//   const book = books.find(b => b.id === bookId);

//   if (book) {
//     res.json(book);
//   } else {
//     res.status(404).json({ message: 'Book not found' });
//   }
// });

// router.post('/:id/like', (req, res) => {
//   const bookId = parseInt(req.params.id, 10);
//   const book = books.find(b => b.id === bookId);

//   if (book) {
//     book.likes += 1;
//     res.json({ likes: book.likes });
//   } else {
//     res.status(404).json({ message: 'Book not found' });
//   }
// });

// router.post('/:id/unlike', (req, res) => {
//   const bookId = parseInt(req.params.id, 10);
//   const book = books.find(b => b.id === bookId);

//   if (book) {
//     book.likes -= 1;
//     res.json({ likes: book.likes });
//   } else {
//     res.status(404).json({ message: 'Book not found' });
//   }
// });

// module.exports = router;


// models/Book.js


const express = require('express');
const router = express.Router();
const Book=require('../models/Book');
// Dummy data for now
const books = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  title: `Book Title ${index + 1}`,
  description: `This is a short description of Book Title ${index + 1}.`,
  image: 'https://images.squarespace-cdn.com/content/v1/59c82ac46f4ca30b86d179bf/1706362642426-BI3J8PJ5LRJNO8H7WFV4/119.bookreview.AtomicHabits.jpg',
  author: 'John Doe',
  publicationYear: 2021,
  genre: 'Fiction',
  isbn: '123-456-789',
  isAvailable: true,
  likes: Math.floor(Math.random() * 100), // Random number of likes
  comments: [
    { id: 1, email: 'user1@example.com', text: 'Great book!' },
    { id: 2, email: 'user2@example.com', text: 'Very informative.' },
    { id: 3, email: 'user3@example.com', text: 'Great book!' },
    { id: 4, email: 'user4@example.com', text: 'Very informative.' },
    { id: 5, email: 'user5@example.com', text: 'Great book!' },
    { id: 6, email: 'user6@example.com', text: 'Very informative.' }
  ]
}));

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/:id/like', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = books.find(b => b.id === bookId);

  if (book) {
    book.likes += 1;
    res.json({ likes: book.likes });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

router.post('/:id/unlike', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = books.find(b => b.id === bookId);

  if (book) {
    book.likes -= 1;
    res.json({ likes: book.likes });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

module.exports = router;
