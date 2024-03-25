import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

function ConferenceDetails() {
  const { id } = useParams();
  const [conference, setConference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8888/ConferenceManagement/getConference", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then(data => {
      setConference(data);
      toast.success('Registration Success!'); 
    })
    .catch(error => {
      console.error("Error fetching conference details: ", error);
      setError(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching conference details!</div>;

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
        <Col>
          <h2>Registration success! We will contact you through email.</h2>
          <p>Name: {conference?.name}</p>
          <p>Date: {conference?.date}</p>
          <p>Time: {conference?.time}</p>
        </Col>
      </Row>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
}

export default ConferenceDetails;