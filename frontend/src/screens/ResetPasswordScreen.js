import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

// Functional component for the Reset Password screen
const ResetPasswordScreen = () => {
  // State variables for password, confirmPassword, and resetSuccess
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    // Extract userId from the query parameters in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    try {
       // Send a PUT request to reset the password
      const response = await axios.put(`/api/users/reset-password/${userId}`, { newPassword: password });
     
      // Display success message and reset state
      alert(response.data.message);
      setResetSuccess(true);
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('An error occurred while resetting the password. Please try again.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center text-white mt-2" style={{ minHeight: '70vh',maxWidth: '80vh', backgroundColor: '#3b3b4f' }}>
      <div>
        <h2 className='text-white'>Reset Password</h2>
        {resetSuccess ? (
          <p className='justify-content-center'>Thank You!....<br/>New password has been set.</p>
        ) : (
          <Form onSubmit={handleSubmit}>

            {/* Input field for new password */}
            <Form.Group controlId="password">
              <Form.Label className='mt-2'>New Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group controlId="confirmPassword">
              <Form.Label className='mt-2'>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className='mt-2'
              />
            </Form.Group>
            
            <Button className="mt-3" variant="primary" type="submit">
              Reset Password
            </Button>
          </Form>
        )}
      </div>
    </Container>
  );
};

export default ResetPasswordScreen;
