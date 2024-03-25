import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AddConference() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const conferenceData = {
      name,
      date,
      time
    };

    fetch('http://localhost:8888/ConferenceManagement/addConference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(conferenceData)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      if (data.name === name && data.date === date && data.time === time) {
        toast.success('Conference successfully added!');
      } else {
        throw new Error('Data verification failed.');
      }
    })
    .catch(error => {
      toast.error('There was a problem with the fetch operation.');
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  return (
    <Container className="my-5">
      <Row className="mb-3">
        <Col xs={4}>
          <Link to="/">
            <Button variant="secondary">Home</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>Add Conference</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formConferenceName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter conference name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formConferenceDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formConferenceTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Conference
            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer position="top-right" autoClose={5000} />
    </Container>
  );
}

export default AddConference;