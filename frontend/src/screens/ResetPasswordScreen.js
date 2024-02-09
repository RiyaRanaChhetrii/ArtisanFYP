import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    try {
      const response = await axios.put(`/api/users/reset-password/${userId}`, { newPassword: password });
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
    <div>
      <h2>Reset Password</h2>
      {resetSuccess ? (
        <p>New password has been set.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordScreen;
