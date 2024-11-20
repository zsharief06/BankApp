import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfileImage from './prof.png'; 

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [balance, setBalance] = useState(0); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      setUserData(storedUser);

      
      axios
        .get(`http://localhost:8080/api/user-balance?userId=${storedUser.id}`)
        .then((response) => {
          setBalance(response.data); 
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching balance.', err);
          setLoading(false);
        });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      background: 'linear-gradient(135deg, #c7bde2, #6220cf)',
      color: 'white',
      textAlign: 'center',
      padding: '50px 20px',
      minHeight: '100vh',
    },
    profileSection: {
      marginBottom: '30px',
    },
    profileImage: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    heading: {
      fontSize: '28px',
      marginBottom: '10px',
    },
    accountDetails: {
      marginBottom: '30px',
    },
    sectionHeading: {
      fontSize: '24px',
      marginBottom: '15px',
    },
    paragraph: {
      fontSize: '16px',
      lineHeight: '1.5',
    },
    balanceSection: {
      marginBottom: '30px',
    },
    balanceAmount: {
      fontSize: '28px',
      fontWeight: 'bold',
      margin: '10px 0',
    },
    transactionsSection: {
      textAlign: 'left',
      maxWidth: '600px',
      margin: '0 auto',
    },
    transactionsList: {
      listStyle: 'none',
      padding: 0,
    },
    transactionItem: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '10px',
    },
  };

  if (loading) return <div style={styles.container}>Loading...</div>;

  return (
    <div style={styles.container}>
      
      <div style={styles.profileSection}>
        <img
          src={ProfileImage} 
          alt="User"
          style={styles.profileImage}
        />
        <h1 style={styles.heading}>Welcome, {userData.name}</h1>
      </div>

      
      <div style={styles.accountDetails}>
        <h2 style={styles.sectionHeading}>Account Details</h2>
        <p style={styles.paragraph}>Email: {userData.email}</p>
        <p style={styles.paragraph}>Account Number: {userData.accountNumber}</p>
        <p style={styles.paragraph}>City: {userData.city}</p>
      </div>

     
      <div style={styles.balanceSection}>
        <h3 style={styles.sectionHeading}>Account Balance:</h3>
        <h2 style={styles.balanceAmount}>${balance}</h2> 
      </div>

     
      <div style={styles.transactionsSection}>
        <h2 style={styles.sectionHeading}>Recent Transactions</h2>
        <ul style={styles.transactionsList}>
          {userData.transactions && userData.transactions.length > 0 ? (
            userData.transactions.map((transaction, index) => (
              <li key={index} style={styles.transactionItem}>
                {transaction.details} - ${transaction.amount}
              </li>
            ))
          ) : (
            <p>No recent transactions.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
