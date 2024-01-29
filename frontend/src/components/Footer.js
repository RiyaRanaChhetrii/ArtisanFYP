import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f0f0f0' }}>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            CopyRight &copy; Artisan
          </Col>
        </Row>
        <Row>
          <Col md={4} className='text-center py-3'>
            <h5>Contact Us</h5>
            <p>Email: info@artisan.com</p>
            <p>Phone: (123) 456-7890</p>
          </Col>
          <Col md={4} className='text-center py-3'>
            <h5>Follow Us</h5>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
          </Col>
          <Col md={4} className='text-center py-3'>
            <h5>Address</h5>
            <p>123 Main Street</p>
            <p>City, Country</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
