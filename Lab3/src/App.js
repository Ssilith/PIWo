import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';

import Navbar from './Navbar';
import Properties from './Properties';
import AddProperty from './AddProperty';
import image from './house.jpg';

function App() {
  const [properties, setProperties] = useState([
    {
      id: 1,
      city: 'Kraków',
      bedrooms: 3,
      description: 'Nowoczesny apartament z tarasem widokowym',
      price: 570000,
      photo: image,
    },
    {
      id: 2,
      city: 'Wrocław',
      bedrooms: 4,
      description: 'Przestronne mieszkanie z 4 sypialniami w Wrocławiu',
      price: 420000,
      photo: image,
    },
    {
      id: 3,
      city: 'Gdańsk',
      bedrooms: 3,
      description: 'Mieszkanie 3-pokojowe w centrum Gdańska',
      price: 550000,
      photo: image,
    },
    {
      id: 4,
      city: 'Łódź',
      bedrooms: 5,
      description: 'Kamienica z dużym tarasem i pięknym widokiem',
      price: 920000,
      photo: image,
    },
    {
      id: 5,
      city: 'Poznań',
      bedrooms: 6,
      description: 'Duży dom z basenem i ogrodem',
      price: 780000,
      photo: image,
    },
    {
      id: 6,
      city: 'Warszawa',
      bedrooms: 2,
      description: 'Apartament w stylu loft w Warszawie',
      price: 680000,
      photo: image,
    },
  ]);

  const [darkMode, setDarkMode] = useState(getInitialMode());

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

  function addProperty(newProperty) {
    const newId = properties.length + 1;
    setProperties([...properties, { id: newId, photo: image, ...newProperty }]);
  }

  return (
    <div style={themeStyle}>
      <BrowserRouter>
        <Navbar darkMode={darkMode} setMode={setMode} />
        <Container>
          <Routes>
            <Route path="/" element={<Properties properties={properties} darkMode={darkMode} />} />
            <Route path="/add-new" element={<AddProperty addProperty={addProperty} />} />
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
      </BrowserRouter>
    </div>
  );
};

export default App;
