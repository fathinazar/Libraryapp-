import React, { useState, useEffect } from 'react';

import './SignupPage.css'; // Import CSS for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    age: '',
    email: '',
    education: '',
    address: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.place) errors.place = 'Place is required';
    if (!formData.age || formData.age <= 0) errors.age = 'Age must be a positive number';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid Email ID is required';
    if (!formData.education) errors.education = 'Education is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) errors.phoneNumber = 'Valid Phone Number is required';
    if (!formData.password || formData.password.length < 4) errors.password = 'Password must be at least 4 characters long';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords must match';
    if (!formData.termsAccepted) errors.termsAccepted = 'You must accept the terms and conditions';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/api/users/register', formData);
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          setIsAuthenticated(true);
          navigate('/', { replace: true });
        }
      } catch (error) {
        setError(error.response.data.msg || 'Signup failed');
      }
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const agreeTerms = () => {
    setFormData({ ...formData, termsAccepted: true });
    closeModal();
  };

  return (
    <div>
     
      <div className="signup-container">
        <h1>Signup</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {formErrors.name && <p className="error">{formErrors.name}</p>}
          </label>
          <label>
            Place:
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              required
            />
            {formErrors.place && <p className="error">{formErrors.place}</p>}
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            {formErrors.age && <p className="error">{formErrors.age}</p>}
          </label>
          <label>
            Email ID:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {formErrors.email && <p className="error">{formErrors.email}</p>}
          </label>
          <label>
            Education:
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
            />
            {formErrors.education && <p className="error">{formErrors.education}</p>}
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {formErrors.address && <p className="error">{formErrors.address}</p>}
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {formErrors.phoneNumber && <p className="error">{formErrors.phoneNumber}</p>}
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {formErrors.password && <p className="error">{formErrors.password}</p>}
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {formErrors.confirmPassword && <p className="error">{formErrors.confirmPassword}</p>}
          </label>
          <div className="terms-label">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            <span onClick={openModal} className="terms-link">
              I agree to the terms and conditions.
            </span>
            {formErrors.termsAccepted && <p className="error">{formErrors.termsAccepted}</p>}
          </div>
          <button type="submit">Signup</button>
        </form>

        {/* Modal for Terms and Conditions */}
        {modalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="modal-close" onClick={closeModal}>&times;</span>
              <h2>Terms and Conditions</h2>
              <p>
                If a book is not returned or damaged, a fine will be charged.
                Fines are as follows:
                <ul>
                  <li>1-5 days overdue: $5</li>
                  <li>6-10 days overdue: $10</li>
                  <li>11-15 days overdue: $15</li>
                  <li>More than 15 days overdue: $20</li>
                </ul>
              </p>
              <button onClick={agreeTerms}>I Agree</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
