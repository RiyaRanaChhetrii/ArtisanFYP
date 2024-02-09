import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../action/userAction';
import Loader from '../components/Loader';

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const forgotPasswordState = useSelector((state) => state.forgotPassword);
  const { loading, success, error } = forgotPasswordState;

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <FormContainer>
      <h1>Forgot Password</h1>
      {showSuccess && <Alert variant="success">Email sent!</Alert>}
      {showError && <Alert variant="danger">{error}</Alert>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mr-2">
          Reset
        </Button>
       
      </Form>
    </FormContainer>
  );
};

export default ForgetPasswordScreen;
