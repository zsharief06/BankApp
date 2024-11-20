import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', loginData);

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data)); 
        setSuccessMessage('Login successful! Redirecting...');

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);

      if (error.response && error.response.data && error.response.data.message === 'Email not registered') {
        setError('Email not registered. Please sign up.');
      } else {
        setError('Error logging in. Please check your credentials.');
      }
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
        <h2 style={styles.heading}>Login</h2>

        {error && <p style={styles.error}>{error}</p>}
        {successMessage && <p style={styles.success}>{successMessage}</p>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
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
            value={loginData.password}
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
          Login
        </button>

        <p>
          Don't have an account?{' '}
          <a
            href="/signup"
            style={styles.link}
            onMouseOver={(e) => (e.target.style.textDecoration = styles.linkHover.textDecoration)}
            onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
          >
            Sign Up now
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
