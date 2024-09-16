import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';  // Use the AuthContext for login
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();  // Use the login function from AuthContext
  const navigate = useNavigate();  // Hook for navigating between routes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password);  // Authenticate user and get token
      navigate('/tasks');  // Redirect to Task List page after successful login
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">  {/* Vertically and horizontally centered */}
    <Row>
      <Col>
        <Card className="shadow-sm" style={{ width: '22rem' }}>  {/* Use a card for cleaner look */}
          <Card.Body>
            <h3 className="text-center mb-4">Login</h3>
            <Form onSubmit={handleSubmit}>
              {error && <p className="text-danger">{error}</p>}
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  );
};

export default LoginPage;
