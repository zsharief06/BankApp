import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountDetails = () => {
  const [accounts, setAccounts] = useState([]); // For storing user accounts
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling
  const [creatingAccount, setCreatingAccount] = useState(false); // To handle account creation
  const [updatingAccount, setUpdatingAccount] = useState(false); // To handle account update state

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.id) {
      const userId = storedUser.id; // Use userId for fetching accounts
      axios
        .get(`http://localhost:8080/api/accounts/user/${userId}`)
        .then((response) => {
          setAccounts(response.data); // Set fetched accounts
          setLoading(false); // Stop loading
        })
        .catch((error) => {
          // If no accounts found, handle the case by setting an empty accounts array
          if (error.response && error.response.status === 404) {
            setAccounts([]); // Set empty array if no accounts are found
            setError(null); // Clear any previous errors
          } else {
            setError("Error fetching account details.");
          }
          setLoading(false); // Stop loading
          console.error("Error fetching account details:", error);
        });
    }
  }, []);

  const handleCreateAccount = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser.id;

    // Prepare account data
    const accountData = {
      accountNumber: "9876543210", // You can generate account numbers dynamically
      balance: 0.00, // Set an initial balance
      accountType: "Savings", // Default account type
      status: "Active", // Default status
      branch: "Main Branch", // Default branch
      accountCreationDate: new Date().toISOString(),
      lastTransactionDate: new Date().toISOString(),
      user: { id: userId },
    };

    setCreatingAccount(true); // Set loading state for creating account

    // Make API call to create the account
    axios
      .post('http://localhost:8080/api/accounts', accountData)
      .then((response) => {
        // After account creation, fetch the new account
        setAccounts([response.data]);
        setCreatingAccount(false); // Stop loading
      })
      .catch((error) => {
        setError("Error creating account.");
        setCreatingAccount(false); // Stop loading
        console.error("Error creating account:", error);
      });
  };

  const handleUpdateAccountStatus = (accountId, newStatus) => {
    const statusData = { status: newStatus }; // Status data for the request

    axios
      .put(`http://localhost:8080/api/accounts/${accountId}/status`, statusData)
      .then((response) => {
        // Update account in the state with the new values
        setAccounts(accounts.map(account => account.id === accountId ? response.data : account));
        setError(null);
      })
      .catch((error) => {
        setError("Error updating account status.");
        console.error("Error updating account status:", error);
      });
  };

  const handleUpdateAccountBalance = (accountId, newBalance) => {
    axios
      .put(`http://localhost:8080/api/accounts/${accountId}/balance?newBalance=${newBalance}`)
      .then((response) => {
        // Update account in the state with the new values
        setAccounts(accounts.map(account => account.id === accountId ? response.data : account));
        setError(null);
      })
      .catch((error) => {
        setError("Error updating account balance.");
        console.error("Error updating account balance:", error);
      });
  };

  const handleDeleteAccount = (accountId) => {
    axios
      .delete(`http://localhost:8080/api/accounts/${accountId}`)
      .then(() => {
        // Remove the deleted account from the state
        setAccounts(accounts.filter(account => account.id !== accountId));
        setError(null);
      })
      .catch((error) => {
        setError("Error deleting account.");
        console.error("Error deleting account:", error);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Account Details</h1>
      {accounts.length === 0 ? (
        <div>
          <p>No accounts found for this user.</p>
          <button onClick={handleCreateAccount} disabled={creatingAccount}>
            {creatingAccount ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>
      ) : (
        accounts.map((account) => (
          <div key={account.id} style={{ marginBottom: '1rem' }}>
            <p><strong>Account Number:</strong> {account.accountNumber}</p>
            <p><strong>Balance:</strong> ${account.balance}</p>
            <p><strong>Account Type:</strong> {account.accountType}</p>
            <p><strong>Status:</strong> {account.status}</p>
            <p><strong>Branch:</strong> {account.branch}</p>
            <p><strong>Account Creation Date:</strong> {new Date(account.accountCreationDate).toLocaleDateString()}</p>
            <p><strong>Last Transaction Date:</strong> {new Date(account.lastTransactionDate).toLocaleDateString()}</p>

            {/* Update Balance Button */}
            <button
              onClick={() => handleUpdateAccountBalance(account.id, 2000.00)}  // Example: Update to 2000
            >
              Update Balance
            </button>

            {/* Update Status Button */}
            <button
              onClick={() => handleUpdateAccountStatus(account.id, 'Frozen')}  // Example: Set status to Frozen
              style={{ marginLeft: '10px' }}
            >
              Freeze Account
            </button>

            {/* Delete Button */}
            <button
              onClick={() => handleDeleteAccount(account.id)} 
              style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
            >
              Delete Account
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default AccountDetails;
