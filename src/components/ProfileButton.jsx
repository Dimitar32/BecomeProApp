import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileButton.module.css';
import profileIcon from '../assets/profile-icon.png'; // Сложи твоята иконка

export default function ProfileButton() {
  const navigate = useNavigate();
  return (
    <button
      className={styles.profileBtn}
      onClick={() => navigate('/profile')}
      aria-label="Профил"
    >
      <img src={profileIcon} alt="Профил" />
    </button>
  );
}