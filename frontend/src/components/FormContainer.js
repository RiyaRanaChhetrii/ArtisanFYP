import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Functional component for a form container layout
const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        {/* Column with width 12 on extra-small screens and width 6 on medium screens and above */}
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
