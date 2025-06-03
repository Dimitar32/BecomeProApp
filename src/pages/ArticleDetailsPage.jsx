import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleById } from '../services/articleService';
import styles from './ArticlesPage.module.css';

export default function ArticleDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const data = await getArticleById(token, id);
        if (data.success) {
          setArticle(data.article);
        } else {
          setError(data.message || 'Article not found.');
        }
      } catch {
        setError('Error loading article.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) return <div className={styles.container}>Зареждане...</div>;
  if (error) return <div className={styles.container}>{error}</div>;
  if (!article) return null;

  return (
    <div className={styles.container}>
      <button
        className={styles.backBtn}
        onClick={() => navigate('/articles')}
        style={{
          background: 'none',
          border: 'none',
          color: '#ffae2b',
          fontSize: '1.1rem',
          fontWeight: 600,
          margin: '18px 0 0 0',
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        ← Назад към статиите
      </button>
      <h1 className={styles.title}>{article.ttl}</h1>
      <div className={styles.articleExcerpt}>{article.exc}</div>
      <div
        className={styles.articleText}
        dangerouslySetInnerHTML={{ __html: article.txt }}
      ></div>
      <div className={styles.articleDate}>
        Създадена: {new Date(article.cre_dat).toLocaleDateString('bg-BG', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })}{" | "}
        {new Date(article.cre_dat).toLocaleTimeString('bg-BG', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })}
      </div>
    </div>
  );
}