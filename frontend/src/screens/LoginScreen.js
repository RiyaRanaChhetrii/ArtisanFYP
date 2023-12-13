// import React, { useState, useEffect } from "react";
// import { Link, redirect } from "react-router-dom";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import MessageOne from "../components/MessageOne";
// import Loader from "../components/Loader";
// import FormContainer from "../components/FormContainer";
// import { login } from "../action/userAction";

// const LoginScreen = ({ location }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const redirect = location.search ? location.search.split('=')[1] : '/'

//   const submitHandler = (e) => {
//     e.preventDefault()
//     // DISPATCH LOGIN
//   }

//   return (
//     <FormContainer>
//       <h1>Sign In</h1>
//       <Form onSubmit={submitHandler}>
//         <Form.Group controlId="email">
//           <Form.Label>Email Address </Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           ></Form.Control>
//         </Form.Group>
//         <Form.Group controlId="password">
//           <Form.Label>Password </Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           ></Form.Control>
//         </Form.Group>
//         <Button type="submit" variant="primary">
//           Sign In
//         </Button>
//       </Form>

//       <Row className="py-3">
//         <Col>
//           New Customer?{" "}
//           <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
//             Register
//           </Link>
//         </Col>
//       </Row>
//     </FormContainer>
//   );
// };

// export default LoginScreen;

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
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
  console.log(userInfo)

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {

    if (userInfo) {
      console.log("Navigating to:", redirect);
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    // DISPATCH LOGIN
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <MessageOne variant="danger">{error}</MessageOne>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Create Account?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
