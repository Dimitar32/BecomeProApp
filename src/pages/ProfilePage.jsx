import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../services/profileService';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found.');
          setLoading(false);
          return;
        }
        const data = await getProfile(token);
        if (data.success) {
          setProfile(data.profile);
          setForm({
            firstName: data.profile.fst_nme || '',
            lastName: data.profile.lst_nme || '',
            email: data.profile.eml || '',
          });
        } else {
          setError(data.message || 'Failed to load profile.');
        }
      } catch (err) {
        setError('Error loading profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEdit(true);
    setSuccess('');
    setError('');
  };

  const handleCancel = () => {
    setEdit(false);
    setSuccess('');
    setError('');
    if (profile) {
      setForm({
        firstName: profile.fst_nme || '',
        lastName: profile.lst_nme || '',
        email: profile.eml || '',
      });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      const data = await updateProfile(token, form);
      if (data.success) {
        setProfile(data.profile);
        setSuccess('Profile updated successfully.');
        setEdit(false);
      } else {
        setError(data.message || 'Failed to update profile.');
      }
    } catch (err) {
      setError('Error updating profile.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.container}>Loading profile...</div>;
  if (error) return <div className={styles.container}><div className={styles.errorMsg}>{error}</div></div>;
  if (!profile) return null;

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Профил</h1>
        {success && <div className={styles.successMsg}>{success}</div>}
        {!edit ? (
          <>
            <div className={styles.profileField}>
              <span className={styles.profileLabel}>Име:</span>
              <span className={styles.profileValue}>{profile.fst_nme}</span>
            </div>
            <div className={styles.profileField}>
              <span className={styles.profileLabel}>Фамилия:</span>
              <span className={styles.profileValue}>{profile.lst_nme}</span>
            </div>
            <div className={styles.profileField}>
              <span className={styles.profileLabel}>Имейл:</span>
              <span className={styles.profileValue}>{profile.eml}</span>
            </div>
            <div className={styles.profileField}>
              <span className={styles.profileLabel}>Username:</span>
              <span className={styles.profileValue}>{profile.usr_nme}</span>
            </div>
            {/* <div className={styles.profileField}>
              <span className={styles.profileLabel}>Created At:</span>
              <span className={styles.profileValue}>{profile.cre_dat}</span>
            </div> */}
            <div className={styles.buttonRow}>
              <button className={styles.primaryButton} onClick={handleEdit}>Промени</button>
            </div>
          </>
        ) : (
          <form className={styles.editForm} onSubmit={handleSave}>
            <div>
              <label className={styles.profileLabel}>
                Име:
                <input
                  className={styles.input}
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label className={styles.profileLabel}>
                Фамилия:
                <input
                  className={styles.input}
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label className={styles.profileLabel}>
                Имейл:
                <input
                  className={styles.input}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className={styles.buttonRow}>
              <button type="submit" className={styles.primaryButton} disabled={loading}>Save</button>
              <button type="button" className={styles.cancelButton} onClick={handleCancel} disabled={loading}>Cancel</button>
            </div>
          </form>
        )}
    </div>
  );
}