import React, { useState } from 'react';
import { Table, Form, Row, Col } from 'react-bootstrap';

const MyProperties = ({ properties, darkMode }) => {
  const [filterCity, setFilterCity] = useState('');
  const [filterBedrooms, setFilterBedrooms] = useState('');
  const [filterDescription, setFilterDescription] = useState('');
  const [sort, setSort] = useState('');

  const handleFilter = (properties) => {
    return properties
      .filter((property) => property.city.toLowerCase().includes(filterCity.toLowerCase()))
      .filter((property) => filterBedrooms ? property.bedrooms === parseInt(filterBedrooms) : true)
      .filter((property) => property.description.toLowerCase().includes(filterDescription.toLowerCase()))
      .sort((a, b) => {
        switch (sort) {
          case 'priceAsc':
            return a.price - b.price;
          case 'priceDesc':
            return b.price - a.price;
          default:
            return 0;
        }
      });
  };

  const filteredProperties = handleFilter(properties);

  return (
    <>
      <h1>Nieruchomości do kupienia</h1>
      <Form>
      <Row>
        <Col>
          <Form.Group controlId="formCity">
            <Form.Label>Miasto:</Form.Label>
            <Form.Control type="text" placeholder="Wprowadź miasto" value={filterCity} onChange={(e) => setFilterCity(e.target.value)} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formBedrooms">
            <Form.Label>Ilość sypialni:</Form.Label>
            <Form.Control type="number" placeholder="Wprowadź ilość sypialni" value={filterBedrooms} onChange={(e) => setFilterBedrooms(e.target.value)} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formDescription">
            <Form.Label>Opis:</Form.Label>
            <Form.Control type="text" placeholder="Wprowadź opis" value={filterDescription} onChange={(e) => setFilterDescription(e.target.value)} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formSort">
            <Form.Label>Sortuj po:</Form.Label>
            <Form.Control as="select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">-</option>
              <option value="priceAsc">Cena rosnąco</option>
              <option value="priceDesc">Cena malejąco</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Form>
      <Table
        striped
        bordered
        hover
        style={{
          backgroundColor: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
          color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
        }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Miasto</th>
            <th>Ilość sypialni</th>
            <th>Opis</th>
            <th>Cena</th>
            <th>Zdjęcie</th>
          </tr>
        </thead>
        <tbody>
          {filteredProperties.map((property) => (
            <tr key={property.id}>
              <td>{property.id}</td>
              <td>{property.city}</td>
              <td>{property.bedrooms}</td>
              <td>{property.description}</td>
              <td>{property.price}</td>
              <td>
                <img src={property.photo} alt={property.city} width="100" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default MyProperties;
