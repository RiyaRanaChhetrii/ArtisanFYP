import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../action/userAction";

// Functional component for the header
export const Header = () => {
  const dispatch = useDispatch();

  // Retrieve user login information from the redux store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar expand="lg"  variant="dark" style={{backgroundColor: "#1b1b32"}}>
        <Container >
          <LinkContainer to="/">
            <Navbar.Brand>Artisan</Navbar.Brand>
          </LinkContainer>

           {/* Responsive Navbar Toggle Button */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

           {/* Navbar Collapse containing navigation links and SearchBox */}
          <Navbar.Collapse id="responsive-navbar-nav"  className="justify-content-between">
            
            {/* SearchBox component */}
            <SearchBox />

             {/* Navigation links */}
            <Nav  >
              <LinkContainer to="/">
                <Nav.Link className=" d-flex gap-2 align-items-center">
                  <i className="fa-solid fa-house"></i>Home
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/cart">
                <Nav.Link className=" d-flex gap-2 align-items-center">
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>
              
              {/* Admin dropdown menu (visible to admin users only) */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {/* User-related dropdown menu */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                 // Sign In link (visible when user is not logged in)
                <LinkContainer to="/login">  
                  <Nav.Link>
                    <i className="fas fa-user"></i>Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
