import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';  // Use AuthContext for authentication state
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import AuthService from '../services/AuthService';  // Import AuthService to get user data

const Navbar: React.FC = () => {
  const { logout } = useAuth();  // Access the logout function from AuthContext
  const user = AuthService.getUser();  // Get user info from localStorage

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/welcome">
          TaskManager
        </BootstrapNavbar.Brand>
        <Nav className="me-auto">
          {user && (
            <>
              <Nav.Link as={Link} to="/tasks">Tasks</Nav.Link>
              <Nav.Link as={Link} to="/tasks/new">Create Task</Nav.Link>
            </>
          )}
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
        </Nav>
        <Nav>
          {user ? (
            <>
              <span className="navbar-text me-2">Welcome, {user.username}!</span>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </>
          ) : (
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          )}
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
