import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, ButtonGroup } from 'react-bootstrap';

const AccountDetails = () => {
  const [accounts, setAccounts] = useState([]); 
  const [balance, setBalance] = useState(0); 
  const [accountNumber, setAccountNumber] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creatingAccount, setCreatingAccount] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.id) {
      const userId = storedUser.id;

      axios
        .get(`http://localhost:8080/api/accounts/user/${userId}`)
        .then((response) => {
          setAccounts(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setAccounts([]);
            setError(null);
          } else {
            setError("Error fetching account details.");
          }
        });

      // Fetch balance
      axios
        .get(`http://localhost:8080/api/user-balance?userId=${userId}`)
        .then((response) => {
          setBalance(Math.round(response.data)); 
        })
        .catch((error) => {
          setError("Error fetching balance.");
          console.error(error);
        });

    
      setAccountNumber(storedUser.accountNumber || 'N/A'); 
    }

    setLoading(false);
  }, []);

  const handleCreateAccount = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.id) {
      const userId = storedUser.id;

      const accountData = {
        accountNumber: storedUser.accountNumber, 
        balance: balance, 
        accountType: 'Savings',
        status: 'Active',
        branch: 'Main Branch',
        accountCreationDate: new Date().toISOString(),
        lastTransactionDate: new Date().toISOString(),
        user: { id: userId },
      };

      setCreatingAccount(true);

      axios
        .post('http://localhost:8080/api/accounts', accountData)
        .then((response) => {
          setAccounts([...accounts, response.data]); 
          setCreatingAccount(false);
        })
        .catch((error) => {
          setError('Error creating account.');
          setCreatingAccount(false);
          console.error('Error creating account:', error);
        });
    }
  };

  const handleFreezeAccount = (accountId) => {
    axios
      .put(`http://localhost:8080/api/accounts/${accountId}/status`, {
        status: "Frozen",
      })
      .then(() => {
        setAccounts((prevAccounts) =>
          prevAccounts.map((account) =>
            account.id === accountId
              ? { ...account, status: "Frozen" }
              : account
          )
        );
      })
      .catch((error) => {
        console.error("Error freezing account:", error);
        setError("Failed to freeze the account.");
      });
  };

  const handleDeleteAccount = (accountId) => {
    axios
      .delete(`http://localhost:8080/api/accounts/${accountId}`)
      .then(() => {
        setAccounts((prevAccounts) =>
          prevAccounts.filter((account) => account.id !== accountId)
        );
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
        setError("Failed to delete the account.");
      });
  };

  const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      background: 'linear-gradient(135deg, #c7bde2, #6220cf)',
      color: 'white',
      padding: '50px 20px',
      minHeight: '100vh',
      textAlign: 'center',
    },
    accountCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      marginBottom: '20px',
      textAlign: 'left',
      color: 'white',
    },
    buttonGroup: {
      marginTop: '10px',
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

  if (loading) return <div style={styles.container}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <h1>Account Details</h1>
      {accounts.length === 0 ? (
        <div>
          <p>No accounts found for this user.</p>
          <Button
            variant="primary"
            size="sm"
            onClick={handleCreateAccount} 
            disabled={creatingAccount}
          >
            {creatingAccount ? "Creating Account..." : "Create Account"}
          </Button>
        </div>
      ) : (
        accounts.map((account) => (
          <div key={account.id} style={styles.accountCard}>
            <p><strong>Account Number:</strong> {accountNumber}</p>
            <p><strong>Balance:</strong> ${balance}</p> 
            <p><strong>Account Type:</strong> {account.accountType}</p>
            <p><strong>Status:</strong> {account.status}</p>
            <p><strong>Branch:</strong> {account.branch}</p>
            <p>
              <strong>Account Creation Date:</strong>{" "}
              {new Date(account.accountCreationDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Last Transaction Date:</strong>{" "}
              {new Date(account.lastTransactionDate).toLocaleDateString()}
            </p>

           
            <ButtonGroup style={styles.buttonGroup}>
              <Button
                variant="warning"
                size="sm"
                onClick={() => handleFreezeAccount(account.id)}
              >
                Freeze Account
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteAccount(account.id)}
              >
                Delete Account
              </Button>
            </ButtonGroup>
          </div>
        ))
      )}
    </div>
  );
};

export default AccountDetails;
