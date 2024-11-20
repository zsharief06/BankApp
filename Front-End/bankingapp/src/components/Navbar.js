import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './Navbar.css';

const CustomNavbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    setUser(null); 
    navigate('/login'); 
  };

  return (
    <Navbar bg="dark" expand="lg" className="navbar-custom">
      <Navbar.Brand as={Link} to="/" className="brand-left">
        <span className="brand-text">CITY BANK</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto nav-links">
          <Nav.Item>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/help">Help</Nav.Link>
          </Nav.Item>

          {user ? (
            <>
              <Nav.Item>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/account-details">Account Details</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/transactions">Transactions</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Button variant="outline-light" className="logout-btn" onClick={handleLogout}>
                  Logout
                </Button>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
