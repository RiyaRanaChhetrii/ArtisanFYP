import React from 'react'
import{Navbar, Nav, Container} from 'react-bootstrap'

export const Header = () => {
  return (
    <header>
      <Navbar bg="dark"  variant='dark' data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Artisan</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href=".home">Home</Nav.Link>
            <Nav.Link href="/cart"><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
            <Nav.Link href="/login"><i className='fas fa-user'></i>Sign In</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}
