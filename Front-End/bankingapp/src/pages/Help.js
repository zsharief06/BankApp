import React from 'react';

const Help = () => {
  const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      background: 'linear-gradient(135deg, #c7bde2, #6220cf)',
      color: 'white',
      textAlign: 'center',
      padding: '50px 20px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      fontSize: '36px',
      marginBottom: '20px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    },
    paragraph: {
      fontSize: '18px',
      lineHeight: '1.6',
      marginBottom: '20px',
      maxWidth: '600px',
    },
    button: {
      fontSize: '16px',
      fontWeight: 'bold',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#4caf50',
      color: 'white',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      marginTop: '20px',
    },
    buttonHover: {
      backgroundColor: '#3e8e41',
      transform: 'scale(1.05)',
    },
    faqSection: {
      marginTop: '40px',
      textAlign: 'left',
      maxWidth: '800px',
    },
    faqHeading: {
      fontSize: '28px',
      marginBottom: '20px',
    },
    faqItem: {
      marginBottom: '15px',
    },
    faqQuestion: {
      fontWeight: 'bold',
      fontSize: '18px',
    },
    faqAnswer: {
      fontSize: '16px',
      lineHeight: '1.5',
      marginTop: '5px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Need Help?</h2>
      <p style={styles.paragraph}>
        Our customer support team is here to assist you with any issues or inquiries.
        Feel free to reach out to us at any time! We're committed to ensuring your
        experience with City Bank is seamless and enjoyable.
      </p>
      <button
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
        Contact Support
      </button>

      <div style={styles.faqSection}>
        <h3 style={styles.faqHeading}>Frequently Asked Questions</h3>
        <div style={styles.faqItem}>
          <p style={styles.faqQuestion}>Q: How do I reset my password?</p>
          <p style={styles.faqAnswer}>
            A: To reset your password, click on the "Forgot Password" link on the login page and follow the instructions.
          </p>
        </div>
        <div style={styles.faqItem}>
          <p style={styles.faqQuestion}>Q: How can I contact customer support?</p>
          <p style={styles.faqAnswer}>
            A: You can reach us via email at support@citybank.com or by calling our 24/7 hotline at +1-800-123-4567.
          </p>
        </div>
        <div style={styles.faqItem}>
          <p style={styles.faqQuestion}>Q: Where can I find my account number?</p>
          <p style={styles.faqAnswer}>
            A: Your account number can be found on your bank statement, in the account details section of your online
            banking dashboard, or by contacting customer support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
