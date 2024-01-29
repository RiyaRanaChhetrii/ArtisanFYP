// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { LinkContainer } from "react-router-bootstrap";
// import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
// import SearchBox from "./SearchBox";
// import { logout } from "../action/userAction";

// export const Header = () => {
//   const dispatch = useDispatch();

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;
//   const logoutHandler = () => {
//     dispatch(logout());
//   };
//   return (
//     <header>
//       <Navbar expand="lg" bg="dark" variant="dark" >
//         <Container>
//           <LinkContainer to="/">
//             <Navbar.Brand>Artisan</Navbar.Brand>
//           </LinkContainer>
//           {/* <Routes render={({history}) => <SearchBox history={history} />} /> */}
//           <SearchBox />
//           <Nav className="ml-auto">
//             <LinkContainer to="/">
//               <Nav.Link>
//                 <i className="fa-solid fa-house"></i>Home
//               </Nav.Link>
//             </LinkContainer>
//             <LinkContainer to="/cart">
//               <Nav.Link>
//                 <i className="fas fa-shopping-cart"></i>Cart
//               </Nav.Link>
//             </LinkContainer>
//             {userInfo ? (
//               <NavDropdown title={userInfo.name} id="username">
//                 <LinkContainer to="/profile">
//                   <NavDropdown.Item>Profile</NavDropdown.Item>
//                 </LinkContainer>
//                 <NavDropdown.Item onClick={logoutHandler}>
//                   Logout
//                 </NavDropdown.Item>
//               </NavDropdown>
//             ) : (
//               <LinkContainer to="/login">
//                 <Nav.Link>
//                   <i className="fas fa-user"></i>Sign In
//                 </Nav.Link>
//               </LinkContainer>
//             )}
//             {userInfo && userInfo.isAdmin && (
//               <NavDropdown title="Admin" id="adminmenu">
//                 <LinkContainer to="/admin/userlist">
//                   <NavDropdown.Item>Users</NavDropdown.Item>
//                 </LinkContainer>
//                 <LinkContainer to="/admin/productlist">
//                   <NavDropdown.Item>Products</NavDropdown.Item>
//                 </LinkContainer>
//                 <LinkContainer to="/admin/orderlist">
//                   <NavDropdown.Item>Orders</NavDropdown.Item>
//                 </LinkContainer>
//               </NavDropdown>
//             )}
//           </Nav>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../action/userAction";

export const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container >
          <LinkContainer to="/">
            <Navbar.Brand>Artisan</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav"  className="justify-content-between">
       
            <SearchBox />

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
