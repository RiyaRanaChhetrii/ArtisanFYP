import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import MessageOne from "../components/MessageOne";
import Loader from "../components/Loader";
import { getUserDetails, updateUser } from "../action/userAction";
import { USER_UPDATE_RESET } from "../constants/userConstants";

// This component allow admins to edit user details
const UserEditScreen = ({ match }) => {
  const { id } = useParams(); //Extract id

   // Local state for managing form input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // React Router's navigation hook
  const navigate = useNavigate();

    // Redux hooks to dispatch actions and select data from the store
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  
  //Extract user update from Redux store
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  // To fetch user details when the component mounts and handle updates
  useEffect(() => {
    if (successUpdate) {
      // If user update is successful, reset user update state
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist"); // Navigate to the user list
    } else {
      // If user details are not available or the user id doesn't match, fetch user details
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        // If user details available, update local state with user information
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin); // Set user admin
      }
    }
  }, [dispatch, navigate, id, user, successUpdate]);

   // Event handler for form submission
  const submitHandler = (e) => {
    e.preventDefault();
     // Dispatch action to update the user with the new information
    dispatch(updateUser({ _id: id, name, email, isAdmin }));
  };

  return (
    <>
      {/* Link to navigate back to the user list */}
      <Link to="/admin/userlist" className="btn btn-light my-3 button-rad">
        Go Back
      </Link>

      {/* FormContainer component for styling */}
      <FormContainer>

        <h1>Edit User</h1>
        {loadingUpdate && <loading />}
        {errorUpdate && <MessageOne variant="danger">{errorUpdate}</MessageOne>}
        {loading ? (
          <Loader />
        ) : error ? (
          <MessageOne variant="danger">{error}</MessageOne>
        ) : (
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

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                value={isAdmin}
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            {/* Update Button in admin panel */}
            <Button className="button-rad mt-3" type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
