import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import MessageOne from "../components/MessageOne";
import Loader from "../components/Loader";
import { register } from "../action/userAction";

// Functional component for the Register screen
const RegisterScreen = () => {
  // State for user registration data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  
  //Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // To get userRegister state from redux store
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

   // Get redirect parameter from query string in location
  const redirect = location.search ? location.search.split("=")[1] : "/";

  //useEffect to redirect after successful registration  
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  // Handler for form submission
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <Container
      style={{
        backgroundColor: "#3b3b4f",
        marginTop: "7vh",
        marginBottom: "7vh",
        minHeight: "60vh",
        maxWidth: "100vh",
        color: "white", // Title color
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "10px", 
      }}
      className="py-3"
    >
      <FormContainer>
        <h1 style={{ color: "white", textAlign: "center" }}>Sign Up</h1>
        
        {message && <MessageOne variant="danger">{message}</MessageOne>}
        {error && <MessageOne variant="danger">{error}</MessageOne>}
        {loading && <Loader />}
         
        {/* Registration form */} 
        <Form onSubmit={submitHandler} >
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ borderRadius: "10px", marginTop: "2px" }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label className="mt-2">Email Address </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: "10px" }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label className="mt-2">Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: "10px" }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label className="mt-2">Confirm Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ borderRadius: "10px" }}
            ></Form.Control>
          </Form.Group>

          <Button
            className="button-rad mt-3 "
            type="submit"
            variant="primary"
          >
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Have an Account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              style={{ color: "white" }} 
            >
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </Container>
  );
};

export default RegisterScreen;
