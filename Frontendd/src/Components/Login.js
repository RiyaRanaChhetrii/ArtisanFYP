import React, {useState}from 'react';
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Components/Login.css";
import {Link} from "react-router-dom";

const Login = () => {
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
    <div className='loginform'>
      {console.log(user)}
      <div className="d-flex align-items-center justify-content-center min-vh-100">
     
        <Container>
          <h3>Login</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name ="email" value={user.email} onChange={handleChange} placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name ="password" value={user.password} onChange={handleChange} placeholder="Password" />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            
            <Link className="forgotps" to="/forget">Forget Password</Link>

            <div className="text-center"> 
            <p>Don't have account? <Link className="login" to="/Signup">Signup</Link></p>
              <Button variant="outline-dark" type="submit">
                Submit
              </Button>
              <br/>
              <h5>or</h5>
              <Button className="googlebtn" variant="outline-dark" type="submit">
                Google
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default Login;
