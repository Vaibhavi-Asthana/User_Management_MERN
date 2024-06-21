// src/components/Signup.js

import React, { useState } from 'react';
import { signup, confirmEmail } from '../services/api'; // Adjust the path as per your actual file structure
import './Signup.css'; // Import Signup specific CSS

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(formData);
      setMessage(response.message);
      setIsOtpSent(true);
    } catch (error) {
      setMessage('you are already signed up');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await confirmEmail({ email: formData.email, otp });
      setMessage(response.message);
    } catch (error) {
      setMessage('OTP verification failed.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {isOtpSent ? (
        <form className="otp-form" onSubmit={handleOtpSubmit}>
          <div className="form-group">
            <label>OTP</label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button type="submit">Verify OTP</button>
        </form>
      ) : (
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Signup</button>
        </form>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Signup;
