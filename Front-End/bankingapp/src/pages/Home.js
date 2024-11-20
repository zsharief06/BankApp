import React from 'react';
import Logo from './logo.avif';


const Home = () => {
  const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      background: 'linear-gradient(135deg, #c7bde2, #6220cf)',
      color: 'white',
      textAlign: 'center',
      padding: '50px 20px',
      minHeight: '100vh',
    },
    logoSection: {
      marginBottom: '30px',
    },
    logoPlaceholder: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: '20px 40px',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    },
    titleSection: {
      marginBottom: '40px',
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    },
    servicesSection: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
    },
    serviceButton: {
      fontSize: '18px',
      fontWeight: 'bold',
      padding: '15px 25px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      backgroundColor: 'white',
      color: '#6220cf',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    serviceButtonHover: {
      backgroundColor: '#c7bde2',
      color: 'white',
    },
    footer: {
        marginTop: '50px',
        fontSize: '16px',
        color: 'rgba(255, 255, 255, 0.8)',
      },
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoSection}>
      <div>
  <img 
     src={Logo} alt="Bank Logo"  
    style={{
      width: '200px',
      height: 'auto', 
      borderRadius: '10px', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
    }} 
  />
</div>

      </div>
      <div style={styles.titleSection}>
        <h2 style={styles.title}>WELCOME TO CITY BANK</h2>
      </div>
      <div style={styles.servicesSection}>
        <button
          style={styles.serviceButton}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#c7bde2';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'white';
            e.target.style.color = '#6220cf';
          }}
        >
          INSURANCE
        </button>
        <button
          style={styles.serviceButton}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#c7bde2';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'white';
            e.target.style.color = '#6220cf';
          }}
        >
          LOANS
        </button>
        <button
          style={styles.serviceButton}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#c7bde2';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'white';
            e.target.style.color = '#6220cf';
          }}
        >
          NEW INVESTMENTS
        </button>
      </div>
    </div>
  );
};

export default Home;
