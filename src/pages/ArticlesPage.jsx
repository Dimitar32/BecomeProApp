// src/pages/ArticlesPage.jsx
import React, { useEffect, useState } from 'react';
import { getAllArticles, getCategories, getArticlesByCategory } from '../services/articleService';
import styles from './ArticlesPage.module.css';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openArticleId, setOpenArticleId] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getCategories(token);
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (err) {
        // Optionally handle category errors
      }
    };
    fetchCategories();
  }, []);

  // Fetch articles (all or by category)
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        let data;
        if (selectedCat === 'all') {
          data = await getAllArticles(token);
        } else {
          data = await getArticlesByCategory(token, selectedCat);
        }
        if (data.success) {
          setArticles(data.articles);
        } else {
          setError(data.message || 'Failed to load articles.');
        }
      } catch (err) {
        setError('Error loading articles.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [selectedCat]);

  const handleCategoryChange = (e) => {
    setSelectedCat(e.target.value);
    setOpenArticleId(null);
  };

  const handleArticleClick = (id) => {
    setOpenArticleId(openArticleId === id ? null : id);
  };

  if (loading) return <div className={styles.container}>Loading articles...</div>;
  if (error) return <div className={styles.container}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Футболни статии</h1>
      <div className={styles.filterBar}>
        <label htmlFor="category-select"><strong>Категория: </strong></label>
        <select
          id="category-select"
          value={selectedCat}
          onChange={handleCategoryChange}
          className={styles.select}
        >
          <option value="all">Всички</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nme}</option>
          ))}
        </select>
      </div>
      {articles.length === 0 ? (
        <p>Няма намерени статии.</p>
      ) : (
        <ul className={styles.articlesList}>
          {articles.map((art) => (
            <li
              key={art.id}
              className={styles.articleCard}
              style={{ cursor: 'pointer' }}
              onClick={() => handleArticleClick(art.id)}
            >
              <h3 className={styles.articleTitle}>{art.ttl}</h3>
              {openArticleId === art.id && (
                <div>
                  <div className={styles.articleCategory}>
                    {art.category || '-'}
                  </div>
                  <div className={styles.articleExcerpt}>{art.exc}</div>
                  <div className={styles.articleDate}>Създадена: {art.cre_dat}</div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
