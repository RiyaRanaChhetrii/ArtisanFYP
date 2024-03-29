import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Functional component for Footer
export const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1b1b32', color: 'white' }}>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            CopyRight &copy; Artisan
          </Col>
        </Row>
        <Row>
          <Col md={4} className='text-center py-3'>
            <h5 style={{ color: "white"}}>Contact Us</h5>
            <p>Email: info@artisan.com</p>
            <p>Phone: (123) 456-7890</p>
          </Col>
          <Col md={4} className='text-center py-3'>
            <h5 style={{ color: "white"}}>Follow Us</h5>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
          </Col>
          <Col md={4} className='text-center py-3'>
            <h5 style={{ color: "white"}}>Address</h5>
            <p>123 Main Street</p>
            <p>City, Country</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
