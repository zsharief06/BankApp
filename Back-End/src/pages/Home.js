import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="logo-section">
        <div className="logo-placeholder">LOGO OF BANK</div>
      </div>
      <div className="title-section">
        <h2>WELCOME TO PaisaFi</h2>
      </div>
      <div className="services-section">
        <button className="service-button">Your Dashboard</button>
        <button className="service-button">Account Details</button>
        <button className="service-button">Transactions</button>
      </div>
    </div>
  );
};

export default Home;
