import React, { useEffect, useState } from 'react';
import styles from './TrainingsPage.module.css';
import { getTrainingCategories, getTrainingsByCategory } from '../services/trainingService';

export default function TrainingsPage() {
  const [categories, setCategories] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const data = await getTrainingCategories(token);
        if (data.success) {
          setCategories(data.categories);
        } else {
          setError(data.message || 'Грешка при зареждане на категориите.');
        }
      } catch (err) {
        setError('Грешка при зареждане на категориите.');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch trainings when category is selected
  useEffect(() => {
    if (!selectedCategory) return;
    const fetchTrainings = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const data = await getTrainingsByCategory(token, selectedCategory.id);
        if (data.success) {
          setTrainings(data.trainings);
        } else {
          setError(data.message || 'Грешка при зареждане на тренировките.');
        }
      } catch (err) {
        setError('Грешка при зареждане на тренировките.');
      } finally {
        setLoading(false);
      }
    };
    fetchTrainings();
  }, [selectedCategory]);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSelectedTraining(null);
  };

  const handleTrainingClick = (training) => {
    setSelectedTraining(training);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Тренировки</h1>
      {error && <div className={styles.errorMsg}>{error}</div>}
      {loading && <div className={styles.loadingMsg}>Зареждане...</div>}

      {!selectedCategory && !loading && (
        <ul className={styles.categoryList}>
          {categories.map(cat => (
            <li
              key={cat.id}
              className={styles.categoryItem}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat.nme}
            </li>
          ))}
        </ul>
      )}

      {selectedCategory && !selectedTraining && !loading && (
        <div>
          <button className={styles.backBtn} onClick={() => setSelectedCategory(null)}>← Категории</button>
          <h2 className={styles.subtitle}>{selectedCategory.nme}</h2>
          <ul className={styles.trainingList}>
            {trainings.map(train => (
              <li
                key={train.id}
                className={styles.trainingItem}
                onClick={() => handleTrainingClick(train)}
              >
                {train.ttl}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedTraining && (
        <div>
          <button className={styles.backBtn} onClick={() => setSelectedTraining(null)}>← {selectedCategory.nme}</button>
          <h2 className={styles.subtitle}>{selectedTraining.ttl}</h2>
          <div className={styles.videoWrapper}>
            <iframe
              width="100%"
              height="220"
              src={selectedTraining.you_tub_lnk || "https://www.youtube.com/embed/4u4zNDc6awE"}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          {selectedTraining.dsc && (
            <div className={styles.trainingDesc}>{selectedTraining.dsc}</div>
          )}
        </div>
      )}
    </div>
  );
}