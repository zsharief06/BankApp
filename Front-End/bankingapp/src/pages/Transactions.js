import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button, Alert, DropdownButton, Dropdown } from 'react-bootstrap';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('deposit'); 
  const [details, setDetails] = useState('');
  const [userId, setUserId] = useState(null);
  const [balance, setBalance] = useState(0); 
  const [error, setError] = useState(null); 
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUserId(storedUser ? storedUser.id : null);

    if (storedUser && storedUser.id) {
      
      axios
        .get(`http://localhost:8080/api/transactions?userId=${storedUser.id}`)
        .then((response) => {
          setTransactions(response.data);
        })
        .catch((err) => {
          setError('Error fetching transactions.');
          console.error(err);
        });

      axios
        .get(`http://localhost:8080/api/user-balance?userId=${storedUser.id}`)
        .then((response) => {
          setBalance(Math.round(response.data));
        })
        .catch((err) => {
          setError('Error fetching balance.');
          console.error(err);
        });
    }
  }, []);

  const handleTransactionSubmit = (e) => {
    e.preventDefault();

    
    if (type === 'withdrawal' && parseFloat(amount) > balance) {
      setError('Insufficient balance for withdrawal.');
      return;
    }

    if (parseFloat(amount) <= 0) {
      setError('Amount must be greater than 0.');
      return;
    }

    const transaction = {
      amount: Math.round(parseFloat(amount)), 
      type,
      details,
    };

    axios
      .post(`http://localhost:8080/api/add-transaction?userId=${userId}`, transaction)
      .then((response) => {
        setTransactions([...transactions, response.data]);
        setBalance(
          Math.round(
            balance +
              (type === 'deposit' ? parseFloat(transaction.amount) : -parseFloat(transaction.amount))
          )
        ); 
        setAmount('');
        setDetails('');
        setSuccessMessage('Transaction successful!');
        setError(null); 
      })
      .catch((err) => {
        setError('Error adding transaction.');
        console.error('Error adding transaction:', err);
      });
  };

  const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      background: 'linear-gradient(135deg, #c7bde2, #6220cf)',
      color: 'white',
      padding: '50px 20px',
      minHeight: '100vh',
    },
    heading: {
      fontSize: '32px',
      marginBottom: '20px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    },
    balanceSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '10px',
      marginBottom: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    balanceText: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    transactionsList: {
      listStyle: 'none',
      padding: 0,
    },
    listItem: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: '10px 15px',
      borderRadius: '10px',
      marginBottom: '10px',
      color: 'white',
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      color: 'white',
      marginTop: '30px',
    },
    button: {
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 15px',
      cursor: 'pointer',
    },
    error: {
      color: '#ff4d4d',
      textAlign: 'center',
    },
    success: {
      color: '#4caf50',
      textAlign: 'center',
    },
  };

  return (
    <Container style={styles.container}>
      <h3 style={styles.heading}>Recent Transactions</h3>

      <div style={styles.balanceSection}>
        <h4 style={styles.balanceText}>Current Balance: ${balance}</h4>
      </div>

      <ul style={styles.transactionsList}>
        {transactions.length ? (
          transactions.map((transaction, index) => (
            <li key={index} style={styles.listItem}>
              {transaction.details} - ${Math.round(transaction.amount)} ({transaction.type})
            </li>
          ))
        ) : (
          <p>No transactions found.</p>
        )}
      </ul>

      <Card style={styles.card}>
        <Card.Body>
          <h3 style={styles.heading}>Add a New Transaction</h3>

          {error && <p style={styles.error}>{error}</p>}
          {successMessage && <p style={styles.success}>{successMessage}</p>}

          <Form onSubmit={handleTransactionSubmit}>
            <Form.Group controlId="amount" className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="1"
              />
            </Form.Group>

            <Form.Group controlId="type" className="mb-3">
              <Form.Label>Type</Form.Label>
              <DropdownButton
                id="dropdown-basic-button"
                title={type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                onSelect={(selectedType) => setType(selectedType)}
                variant="secondary"
              >
                <Dropdown.Item eventKey="deposit">Deposit</Dropdown.Item>
                <Dropdown.Item eventKey="withdrawal">Withdrawal</Dropdown.Item>
              </DropdownButton>
            </Form.Group>

            <Form.Group controlId="details" className="mb-3">
              <Form.Label>Details</Form.Label>
              <Form.Control
                type="text"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" style={styles.button}>
              Submit Transaction
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Transactions;
