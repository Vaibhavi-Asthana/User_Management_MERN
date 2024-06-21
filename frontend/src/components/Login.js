// src/components/Login.js
import React, { useState } from 'react';
import { loginWithOtp } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginWithOtp({ email, otp });
      setMessage(response.message);
      // Save token and redirect to profile or home page
      localStorage.setItem('token', response.token);
      window.location.href = '/profile';
    } catch (error) {
      setMessage('Login failed.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
