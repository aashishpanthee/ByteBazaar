import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='form-container-row'>
        <Col xs={12} md={6} className='form-container-col'>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
