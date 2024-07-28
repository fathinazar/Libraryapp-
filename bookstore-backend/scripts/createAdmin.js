// scripts/createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const createAdmin = async () => {
  try {
    const admin = new Admin({
      username: 'admins@gmail.com',
      password: 'admin123' // This will be hashed by the pre-save hook
    });
    await admin.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.disconnect();
  }
};

createAdmin();