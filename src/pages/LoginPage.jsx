import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import googleIcon from '../assets/google-icon.png';
import logo from '../assets/BecomeProFootball.png';
import { login } from '../services/authService';

export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token } = await login(userName, password);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
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
          <button type="submit" className={styles.primaryButton} disabled={loading}>
            {loading ? <span className={styles.loader}></span> : 'Sign In'}
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>or</span>
          <span className={styles.dividerLine} />
        </div>

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
