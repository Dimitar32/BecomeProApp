import axios from 'axios';

const API_URL = 'https://becomeproappservice.onrender.com';//process.env.REACT_APP_API_URL || 'http://localhost:5000';

// логин: връща { token, user }
export const login = async (userName, password) => {
  const res = await axios.post(`${API_URL}/api/login`, { userName, password });
  return res.data;
};

// регистрация: връща { token, user }
export const register = async (firstName, lastName, email, userName, password) => {
  const res = await axios.post(`${API_URL}/api/register`, { firstName, lastName, email, userName, password });
  return res.data;
};
