import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import googleIcon from '../assets/google-icon.png';
import logo from '../assets/BecomeProFootball.png'; // Пътят към вашето лого
import { login } from '../services/authService';

export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { token } = await login(userName, password);
      localStorage.setItem('token', token);
      navigate('/');  // след успешен login
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoBox}>
        <img src={logo} alt="BecomePro Logo" className={styles.logo} />
        <h2 className={styles.title}>BecomePro App</h2>
      </div>
      <div className={styles.card}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="userName"
            placeholder="User Name"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.primaryButton}>
            Sign In
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>or</span>
          <span className={styles.dividerLine} />
        </div>

        {/* Google OAuth ще е накрая */}
        <button className={styles.googleButton} disabled>
          <img src={googleIcon} alt="Google icon" className={styles.googleIcon} />
          <span>Sign in with Google</span>
        </button>

        <p className={styles.footerText}>
          Don't have an account?{' '}
          <Link to="/register" className={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
