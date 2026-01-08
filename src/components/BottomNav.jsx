import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BottomNav.module.css';
import homeIcon from '../assets/BecomeProFootball.png';
import trainingIcon from '../assets/train-icon.png';
import nutritionIcon from '../assets/nutr-icon.png';
import articlesIcon from '../assets/article-icon.png';
import fitnessIcon from '../assets/fitness-icon.png';

export default function BottomNav() {
  return (
    <nav className={styles.bottomNav}>
      <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>
        <img src={homeIcon} alt="Home" />
        <span>Начало</span>
      </NavLink>
      <NavLink to="/trainings" className={({ isActive }) => isActive ? styles.active : ''}>
        <img src={trainingIcon} alt="Training" />
        <span>Тренировки</span>
      </NavLink>
      <NavLink to="/scan" className={({ isActive }) => isActive ? styles.active : ''}>
        <img src={nutritionIcon} alt="Nutrition" />
        <span>Nutrition</span>
      </NavLink>
      <NavLink to="/articles" className={({ isActive }) => isActive ? styles.active : ''}>
        <img src={articlesIcon} alt="Articles" />
        <span>Статии</span>
      </NavLink>
      <NavLink to="/fitness" className={({ isActive }) => isActive ? styles.active : ''}>
        <img src={fitnessIcon} alt="Fitness" />
        <span>Фитнес</span>
      </NavLink>
    </nav>
  );
}