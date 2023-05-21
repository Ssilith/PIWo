import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext';

const MyNavbar = ({ darkMode }) => {
  const { user, logout, login } = useContext(AuthContext);

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
      <Nav>
        <Nav.Link>
          <Link to="/no-idea" style={{ textDecoration: 'none', color: darkMode ? 'var(--dark-text)' : 'var(--light-text)' }}>
            No Idea
          </Link>
        </Nav.Link>
      </Nav>
      {user ? (
        <>
          <Navbar.Text>
            Zalogowany jako: {user.name} {user.surname}
          </Navbar.Text>
          <Button onClick={logout}>Wyloguj</Button>
        </>
      ) : (
        <Nav.Link>
          <Link to="/login" style={{ textDecoration: 'none', color: darkMode ? 'var(--dark-text)' : 'var(--light-text)' }}>
            Login
          </Link>
        </Nav.Link>
      )}
    </Navbar>
  );
};

export default MyNavbar;
