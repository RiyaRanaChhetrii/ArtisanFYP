import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MessageOne from "../components/MessageOne";
import Loader from "../components/Loader";
import { listUsers } from "../action/userAction";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  // Get user list from Redux state
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Dispatch action to list users when the component mounts
  useEffect(() => {
    if(userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      navigate('/login');
    }
    dispatch(listUsers());
  }, [dispatch, useNavigate]);

  // Function to handle user deletion (currently logging to console)
  const deleteHandler = (id) => {
    console.log('delete')
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        // Show loader while data is being fetched
        <Loader />
      ) : error ? (
        // Show error message if there's an issue fetching data
        <MessageOne variant="danger">{error}</MessageOne>
      ) : (
        // Display user list in a table if data is available
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                   {/* Display check or times icon based on isAdmin status */}
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {/* Edit button with a link to user edit page */}
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  {/* Delete button with a click handler */}
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
