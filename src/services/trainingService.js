import axios from 'axios';

const API_URL = 'https://becomeproappservice.onrender.com/api';//process.env.REACT_APP_API_URL || 'http://localhost:5000';

// const API_URL = process.env.REACT_APP_API_URL;

// Get all training categories
export async function getTrainingCategories(token) {
  const res = await axios.get(`${API_URL}/api/trainings/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

// Get trainings by category ID
export async function getTrainingsByCategory(token, catId) {
  const res = await axios.get(`${API_URL}/api/trainings/category/${catId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}