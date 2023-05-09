import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyNavbar = ({ darkMode }) => {
  return (
    <Navbar
      bg={darkMode ? 'dark' : 'light'}
      variant={darkMode ? 'dark' : 'light'}
      style={{
        backgroundColor: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
      }}
    >
      <Nav>
        <Nav.Link>
          <Link to="/" style={{ textDecoration: 'none', color: darkMode ? 'var(--dark-text)' : 'var(--light-text)' }}>
            Home Page
          </Link>
        </Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link>
          <Link to="/add-new" style={{ textDecoration: 'none', color: darkMode ? 'var(--dark-text)' : 'var(--light-text)' }}>
            Add New
          </Link>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default MyNavbar;
