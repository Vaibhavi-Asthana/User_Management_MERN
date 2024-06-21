// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
});

export const signup = async (userData) => {
  const response = await api.post('/auth/signup', userData);
  return response.data;
};

export const loginWithOtp = async (otpData) => {
  const response = await api.post('/auth/login-otp', otpData);
  return response.data;
};

export const fetchProfile = async (token) => {
  const response = await api.get('/user/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProfile = async (token, profileData) => {
  const response = await api.put('/user/profile', profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const confirmEmail = async (emailData) => {
  const response = await api.post('/auth/confirm-email', emailData);
  return response.data;
};
