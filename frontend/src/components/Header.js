import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import{Navbar, Nav, Container} from 'react-bootstrap'

export const Header = () => {
  return (
    <header>
      <Navbar bg="dark"  variant='dark' data-bs-theme="dark">
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand>Artisan</Navbar.Brand>
          </LinkContainer>
          <Nav className="ml-auto">
          <LinkContainer to='/'>
          <Nav.Link>Home</Nav.Link>
          </LinkContainer>
            <LinkContainer to='/cart'>
            <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
            <Nav.Link><i className='fas fa-user'></i>Sign In</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}
