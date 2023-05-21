import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';

const AddProperty = ({ addProperty }) => {
  const [city, setCity] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const cityInput = useRef(null);

  useEffect(() => {
    cityInput.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addProperty({ city, bedrooms, description, price });
  };

  return (
    <div>
      <h1>Dodaj ogłoszenie</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCity">
          <Form.Label>Miasto:</Form.Label>
          <Form.Control type="text" value={city} ref={cityInput} onChange={(e) => setCity(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBedrooms">
          <Form.Label>Ilość sypialni:</Form.Label>
          <Form.Control type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Opis:</Form.Label>
          <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPrice">
          <Form.Label>Cena:</Form.Label>
          <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Form.Group>
        <Button type="submit">Dodaj</Button>
      </Form>
    </div>
  );
};

export default AddProperty;
