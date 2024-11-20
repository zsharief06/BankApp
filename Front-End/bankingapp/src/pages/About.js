import React from 'react';
import './About.css'; 
import innovative from './innovative.jpg'
import Service from './Service-Banking.jpg'
import Banking from './customer support.jpg'

const About = () => {
  const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      background: 'linear-gradient(135deg, #c7bde2, #6220cf)',
      color: 'white',
      textAlign: 'center',
      padding: '50px 20px',
      minHeight: '100vh',
    },
    heading: {
      fontSize: '40px',
      marginBottom: '20px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    },
    subheading: {
      fontSize: '20px',
      marginBottom: '40px',
      lineHeight: '1.6',
    },
    imagesContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      flexWrap: 'wrap',
      marginTop: '40px',
    },
    footer: {
      marginTop: '50px',
      fontSize: '16px',
      color: 'rgba(255, 255, 255, 0.8)',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About CITYBANK</h1>
      <p style={styles.subheading}>
        Welcome to <strong>City Bank</strong>, where we are redefining modern banking. Our mission is to deliver
        innovative solutions, unparalleled customer support, and a secure financial platform to help you achieve
        your financial goals.
      </p>
      <p style={styles.subheading}>
        With our cutting-edge technology, personalized services, and a customer-first approach, we ensure
        your banking experience is seamless, efficient, and secure.
      </p>
      <div style={styles.imagesContainer}>
        <img
          className="about-image"
          src={innovative}
          alt="Banking Services"
        />
        <img
          className="about-image"
          src={Service}
          alt="Customer Support"
        />
        <img
          className="about-image"
          src={Banking}
          alt="Innovative Solutions"
        />
      </div>
      <footer style={styles.footer}>
        &copy; 2024 City Bank. All rights reserved.
      </footer>
    </div>
  );
};

export default About;
