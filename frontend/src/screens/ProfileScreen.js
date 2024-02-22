import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MessageOne from "../components/MessageOne";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../action/userAction";
import { listMyOrders } from "../action/orderAction";

//Profile Screen to update password and view product
const ProfileScreen = () => {

  // State to manage form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate(); // React router hook for navigation
  const dispatch = useDispatch();

  // Extract the user detail from Redux store
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  // Extract the user Login info from Redux store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Extract the user Update Profile details from the Redux store
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  // Extract the user Order list from Redux store
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      //Handle the case when user info is not avaiable eg. user not logged in
      navigate("/login");
    } else {
      if (!user || !user.name) { 
         // If user details are not available, fetch them along with the user's orders
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        // If user details are available, set the name and email in the local state
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user]);

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { 
      // If passwords do not match, set an error message
      setMessage("Passwords do not match");
    } else {
      // Dispatch action to update user profile
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h1>User Profile</h1>
        {message && <MessageOne variant="danger">{message}</MessageOne>}
        {error && <MessageOne variant="danger">{error}</MessageOne>}
        {/* On success display this message */}
        {success && (
          <MessageOne variant="success">
            Your Profile has been Updated
          </MessageOne>
        )}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

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

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className="button-rad mt-3" type="submit" variant="primary">
            Update
          </Button>
        </Form>

      </Col>
      <Col md={9}>
        {/* Show user order */}
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <MessageOne variant="danger">{errorOrders}</MessageOne>
        ) : (
          <div>
            {/* Display user orders in a table */}
            {orders && orders.length > 0 ? (
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {/* display paid status */}
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {/* display for delivered status */}
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {/* Button to view order details */}
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className='btn-sm button-rad' variant="light">Details</Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <MessageOne variant="info">No orders found.</MessageOne>
            )}
          </div>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
