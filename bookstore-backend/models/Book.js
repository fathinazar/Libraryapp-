// models/Book.js
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  genre: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  isAvailable: { type: Boolean, default: true },
  likes: { type: Number, default: 0 },
  comments: [{
    email: String,
    text: String
  }]
});

module.exports = mongoose.model('Book', BookSchema);