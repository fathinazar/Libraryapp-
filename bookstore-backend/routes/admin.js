// In your admin routes file (e.g., routes/admin.js)
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

 router.use(authMiddleware);

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})



router.get('/book', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/books', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error adding book' });
  }
});



module.exports = router;