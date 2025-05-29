// src/pages/HomePage.jsx
import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import styles from './HomePage.module.css';

export default function HomePage() {
  // Replace 'token' with your actual token key if different
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Добре дошли в BecomePro App!</h1>
      <p className={styles.subtitle}>
        Открийте всичко за футбола: статии, анализи, бележки на играча, сканиране на калории и седмична програма.
      </p>
      <div className={styles.featuresGrid}>
        <Link to="/articles" className={styles.featureCard}>
          <span role="img" aria-label="articles" className={styles.emoji}>⚽</span>
          <h2>Футболни статии</h2>
          <p>Научете повече за тренировки, тактики и новини от света на футбола.</p>
        </Link>
        <Link to="/notes" className={styles.featureCard}>
          <span role="img" aria-label="notes" className={styles.emoji}>📝</span>
          <h2>Бележки на играча</h2>
          <p>Записвайте и следете своя напредък и важни моменти от тренировките.</p>
        </Link>
        <Link to="/scan" className={styles.featureCard}>
          <span role="img" aria-label="scan" className={styles.emoji}>🍏</span>
          <h2>Сканирай калории</h2>
          <p>Следете хранителния си режим и калориите с лесно сканиране.</p>
        </Link>
        <Link to="/schedule" className={styles.featureCard}>
          <span role="img" aria-label="schedule" className={styles.emoji}>📅</span>
          <h2>Седмична програма</h2>
          <p>Организирайте тренировките и мачовете си за седмицата.</p>
        </Link>
      </div>
    </div>
  );
}
