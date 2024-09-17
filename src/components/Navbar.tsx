import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();  // Access user and logout from AuthContext
  const navigate = useNavigate();  // Use navigate for redirection

  const handleLogout = () => {
    logout();  // Perform logout
    navigate('/login');  // Redirect to login page after logout
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/welcome">
          TaskManager
        </BootstrapNavbar.Brand>
        <Nav className="me-auto">
          {currentUser && (
            <>
              <Nav.Link as={Link} to="/tasks">Tasks</Nav.Link>
              <Nav.Link as={Link} to="/tasks/new">Create Task</Nav.Link>
            </>
          )}
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
        </Nav>
        <Nav>
          {currentUser ? (
            <>
              <span className="navbar-text me-2">Welcome, {currentUser.username}!</span>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link> {/* Add Register link */}
            </>
          )}
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
