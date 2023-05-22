import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import axios from 'axios';

import Navbar from './Navbar';
import Properties from './Properties';
import AddProperty from './AddProperty';
import image from './house.jpg';
import AuthContext from './AuthContext';
import Login from './Login';
import NoIdea from './NoIdea';

function App() {
  const [properties, setProperties] = useState([]);

  const [darkMode, setDarkMode] = useState(getInitialMode());

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/data.json');
        const propertiesWithImages = response.data.map(property => ({
          ...property,
          photo: images[property.photo],
        }));
        setProperties(propertiesWithImages);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    }
    fetchProperties();
  }, []);

  const users = [
    { email: 'usermail1@gmail.com', password: 'pass1', name: 'Jan', surname: 'Kowalski' },
    { email: 'usermail2@gmail.com', password: 'pass2', name: 'Pawel', surname: 'Nowak' },
    { email: 'usermail3@gmail.com', password: 'pass3', name: 'Piotr', surname: 'Kowal' },
  ];

  const [user, setUser] = useState(() => {
    const localData = localStorage.getItem('user');
    return localData ? JSON.parse(localData) : null;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  }

  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem('dark'));
    return savedMode || false;
  }

  function setMode(mode) {
    setDarkMode(mode);
    localStorage.setItem('dark', JSON.stringify(mode));
  }

  const themeStyle = {
    backgroundColor: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
  };

  const images = {
    'house.jpg': image,
  };

  function addProperty(newProperty) {
    const newId = properties.length + 1;
    setProperties([...properties, { id: newId, photo: images['house.jpg'], ...newProperty }]);
  }

  return (
    <div style={themeStyle}>
      <BrowserRouter>
        <AuthContext.Provider value={{ user, login, logout }}>
          <Navbar key={user ? user.name : 'guest'} darkMode={darkMode} setMode={setMode} />
          <Container>
            <Routes>
              <Route path="/" element={<Properties properties={properties} darkMode={darkMode} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/add-new" element={<AddProperty addProperty={addProperty} />} />
              <Route path="/no-idea" element={<NoIdea />} />
            </Routes>
            <div> Dark mode
              <Form.Check
                type="switch"
                id="darkModeSwitch"
                checked={darkMode}
                onChange={() => setMode(!darkMode)}
              />
            </div>
          </Container>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
