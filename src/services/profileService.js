import axios from 'axios';

// const API_URL = 'https://becomeproappservice.onrender.com';//process.env.REACT_APP_API_URL || 'http://localhost:5000';

const API_URL = process.env.REACT_APP_API_URL;

// Get profile info (requires Authorization header)
export const getProfile = async (token) => {
  const res = await axios.get(`${API_URL}/api/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Update profile info (requires Authorization header)
export const updateProfile = async (token, { firstName, lastName, email }) => {
  const res = await axios.put(
    `${API_URL}/api/profile`,
    { firstName, lastName, email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return res.data;
};