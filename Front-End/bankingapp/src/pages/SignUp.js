import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    accountNumber: '',
    password: '',
    email: '',
    city: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/register', formData);
      setSuccessMessage('Registration successful! Redirecting...');

      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } catch (error) {
      console.error('There was an error registering the user!', error);
      setError('Registration failed. Please try again.');
    }
  };

  const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      background: 'linear-gradient(135deg, #c7bde2, #6220cf)',
      color: 'white',
      textAlign: 'center',
      padding: '50px 20px',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    form: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: '20px 30px',
      borderRadius: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
    },
    heading: {
      fontSize: '28px',
      marginBottom: '20px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    },
    inputGroup: {
      marginBottom: '15px',
      textAlign: 'left',
    },
    label: {
      fontWeight: 'bold',
      fontSize: '14px',
      color: 'white',
      display: 'block',
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      border: 'none',
      borderRadius: '5px',
      outline: 'none',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    button: {
      width: '100%',
      padding: '10px 15px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: '#6220cf',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
    },
    buttonHover: {
      backgroundColor: '#451a9e',
      transform: 'scale(1.05)',
    },
    error: {
      color: '#ff4d4d',
      fontSize: '14px',
      marginBottom: '10px',
    },
    success: {
      color: '#4caf50',
      fontSize: '14px',
      marginBottom: '10px',
    },
    link: {
      color: '#ffe7a9',
      textDecoration: 'none',
    },
    linkHover: {
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Sign Up</h2>

        {error && <p style={styles.error}>{error}</p>}
        {successMessage && <p style={styles.success}>{successMessage}</p>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
            e.target.style.transform = styles.buttonHover.transform;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = styles.button.backgroundColor;
            e.target.style.transform = 'none';
          }}
        >
          Sign Up
        </button>

        <p>
          Already have an account?{' '}
          <a
            href="/login"
            style={styles.link}
            onMouseOver={(e) => (e.target.style.textDecoration = styles.linkHover.textDecoration)}
            onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
          >
            Login now
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
