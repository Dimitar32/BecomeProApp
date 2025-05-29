import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './RegistrationPage.module.css';
import googleIcon from '../assets/google-icon.png';
import logo from '../assets/BecomeProFootball.png'; // Пътят към вашето лого
import { register } from '../services/authService';

export default function RegistrationPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }
    try {
      const { token } = await register(firstName, lastName, email, userName, password);
      localStorage.setItem('token', token);
      navigate('/');  // след успешна регистрация
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration failed');
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
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="text"
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
          <input
            className={styles.input}
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
          <button type="submit" className={styles.primaryButton}>
            Create Account
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
          <span>Sign up with Google</span>
        </button>

        <p className={styles.footerText}>
          Already have an account?{' '}
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
