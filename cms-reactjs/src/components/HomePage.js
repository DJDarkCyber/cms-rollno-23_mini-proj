import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, ListGroup, Button, Row, Col, Card } from 'react-bootstrap';

function HomePage() {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8888/ConferenceManagement/listConference')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        setConferences(data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col xs={8}>
          <h1>Conferences</h1>
        </Col>
        <Col xs={4} className="text-right">
          <Link to="/admin">
            <Button variant="info">Admin Dashboard</Button>
          </Link>
        </Col>
      </Row>
      <ListGroup>
        {conferences.map(conference => (
          <ListGroup.Item key={conference.id} className="d-flex justify-content-between align-items-center">
            <div className="mr-auto">
              <strong>{conference.name}</strong>
            </div>
            <Link to={`/register/${conference.id}`}>
              <Button variant="primary">Apply</Button>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default HomePage;