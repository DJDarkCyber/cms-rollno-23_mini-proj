import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/conference/${id}`);
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Register for Conference</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegistrationForm;