import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../action/userAction";
import Loader from "../components/Loader";
// import { Link } from "react-router-dom";

// Functional component for the Forgot Password screen
const ForgetPasswordScreen = () => {
  // State for the email input
  const [email, setEmail] = useState("");
  // Initialize useDispatch hook
  const dispatch = useDispatch();

   // Access the forgotPassword state from the Redux store using useSelector
  const forgotPasswordState = useSelector((state) => state.forgotPassword);
  const { loading, success, error } = forgotPasswordState;

  // State to manage the visibility of success and error alerts
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

   // Effect to show success alert when success changes
  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      // Hide the success alert after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
  }, [success]);

  // Effect to show error alert when error changes
  useEffect(() => {
    if (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  }, [error]);

  // Handler for form submission
  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch the forgotPassword action with the provided email
    dispatch(forgotPassword(email));
  };

  return (
    <FormContainer>
      <h1>Forgot Password</h1>
      {showSuccess && <Alert variant="success">Email sent!</Alert>}
      {showError && <Alert variant="danger">{error}</Alert>}
      {loading && <Loader />}

      {/* Forgot password form */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ borderRadius: "10px" }}
          ></Form.Control>
        </Form.Group>
        {/* Reset password Button */}
        <Button style={{ letterSpacing : "4px"}} type="submit" variant="primary" className="button-rad mr-2 mt-4">
          Reset
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ForgetPasswordScreen;
