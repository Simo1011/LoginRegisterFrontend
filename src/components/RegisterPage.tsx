import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const registerData = { username, password };

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        alert('Registration successful! Please log in.');
        navigate('/login'); // Redirect to login after successful registration
      } else {
        const message = await response.text();
        setError(message); // Set error message from the backend
      }
    } catch (error) {
      setError('Network error, please try again later.');
    }
  };

  const handleCancel = () => {
    navigate('/login'); // Redirect to login page when "Cancel" button is clicked
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h3 className="text-center mb-4">Register</h3>
          <Form onSubmit={handleRegister}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3} className="text-left">
                Username
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3} className="text-left">
                Password
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>

            {error && (
              <Row>
                <Col>
                  <div className="alert alert-danger">{error}</div>
                </Col>
              </Row>
            )}

            {/* Add a row for the buttons */}
            <Row className="justify-content-center">
              <Col xs="auto">
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Col>
              <Col xs="auto">
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
