import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../assets/BecomeProFootball.png';
// import ProfileButton from '../components/ProfileButton';
import profileIcon from '../assets/profile-icon.png'; // Add this import

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerBar}>
        <div className={styles.logoTitleBox}>
          {/* Logo links to home */}
          <Link to="/" className={styles.logoLink}>
            <img src={logo} alt="BecomePro Logo" className={styles.logo} />
          </Link>
          <h2 className={styles.title}>BecomePro</h2>
        </div>
        {/* <ProfileButton /> */}
        <button
          onClick={toggleMenu}
          className={styles.hamburger}
          aria-label="Toggle menu"
        >
          <img src={profileIcon} alt="Menu" className={styles.hamburgerIcon} />
        </button>
      </div>
      {open && (
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink} onClick={() => setOpen(false)}>
                Начало
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/articles" className={styles.navLink} onClick={() => setOpen(false)}>
                Статии
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/notes" className={styles.navLink} onClick={() => setOpen(false)}>
                Бележки
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/profile" className={styles.navLink} onClick={() => setOpen(false)}>
                Твоят профил
              </Link>
            </li>
            <li className={styles.navItem}>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Изход
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}