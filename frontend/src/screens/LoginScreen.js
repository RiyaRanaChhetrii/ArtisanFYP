import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import MessageOne from "../components/MessageOne";
import Loader from "../components/Loader";
import { login } from "../action/userAction";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      if (redirect === "shipping") {
        navigate(`/${redirect}`);
      } else {
        navigate(`${redirect}`);
      }
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container
      style={{
        backgroundColor: "#3b3b4f",
        marginTop: "10vh",
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
        <h1 style={{ color: "white", textAlign: "center" }}>LOGIN In</h1>
        {error && <MessageOne variant="danger">{error}</MessageOne>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label className="mt-2">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: "10px" }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: "10px" }}
            ></Form.Control>
          </Form.Group>
          <Button
            className="button-rad pt-3"
            type="submit"
            variant="primary"
          >
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Create Account?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              style={{ color: "white" }} // Link text color
            >
              Register
            </Link>
          </Col>
          <Col>
            <Link to="/forgot-password" style={{ color: "white" }}>Forgot Password?</Link>
          </Col>
        </Row>
      </FormContainer>
    </Container>
  );
};

export default LoginScreen;
