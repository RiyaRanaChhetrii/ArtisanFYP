import React, { useState } from "react";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Components/Style.css";
import {Link} from "react-router-dom";

const Signup = () => {

  const [ user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = e => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name] : value
    })

  }

  return ( 
    <>
      <div id="signForm" className="signSection">
        {console.log("User", user)}
        <div
          id="co"
          className="d-flex align-items-center justify-content-center min-vh-100"
        >
          <Container>
            <row>
              <h3>
                SIGN UP
              </h3>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={user.name} placeholder="Enter Name" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={user.email} placeholder="Enter email"onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password"  name="password" value={user.password}placeholder="Password" onChange={handleChange}/>
                </Form.Group>


                <div className="text-center"> 
                <p>Alreay have account? <Link className="login" to="/login">Login</Link></p>
                  <Button variant="outline-dark " type="submit">
                    Sign Up
                  </Button>
                  <br/>
              <h5>or</h5>
              <Button className="googlebtn" variant="outline-dark" type="submit">
                Google
              </Button>
                </div>
              </Form>
            </row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Signup;
