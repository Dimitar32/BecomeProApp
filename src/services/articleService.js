import axios from 'axios';

const API_URL = 'https://becomeproappservice.onrender.com';//process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Get all categories
export const getCategories = async (token) => {
  const res = await axios.get(`${API_URL}/api/categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get all articles
export const getAllArticles = async (token) => {
  const res = await axios.get(`${API_URL}/api/articles`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get articles by category
export const getArticlesByCategory = async (token, cat_id) => {
  const res = await axios.get(`${API_URL}/api/articles/category/${cat_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Add a new article (admin)
export const addArticle = async (token, article) => {
  const res = await axios.post(`${API_URL}/api/articles`, article, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update an article (admin)
export const updateArticle = async (token, article) => {
  const res = await axios.put(`${API_URL}/api/articles`, article, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Add a new category (admin)
export const addCategory = async (token, category) => {
  const res = await axios.post(`${API_URL}/api/categories`, category, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update a category (admin)
export const updateCategory = async (token, category) => {
  const res = await axios.put(`${API_URL}/api/categories`, category, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get only article titles and ids
export const getArticleTitles = async (token) => {
  const res = await axios.get(`${API_URL}/api/articles/titles`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get article by ID
export const getArticleById = async (token, id) => {
  const res = await axios.get(`${API_URL}/api/articles/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};