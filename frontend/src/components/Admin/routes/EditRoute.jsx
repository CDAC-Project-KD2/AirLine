import { useState } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const EditRoute = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const [formData, setFormData] = useState({
    distanceKm: state?.distanceKm || "",
    durationMinutes: state?.durationMinutes || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Route updated successfully!");
    navigate("/admin/routes");
  };

  if (!state) {
    return (
      <Alert variant="danger">
        No route data found. Please go back to routes list.
      </Alert>
    );
  }

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <h5 className="fw-bold mb-3">Edit Route</h5>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Source Airport</Form.Label>
                <Form.Control
                  value={`${state.sourceAirport?.city} (${state.sourceAirport?.code})`}
                  disabled
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Destination Airport</Form.Label>
                <Form.Control
                  value={`${state.destinationAirport?.city} (${state.destinationAirport?.code})`}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Distance (km)</Form.Label>
                <Form.Control
                  name="distanceKm"
                  type="number"
                  value={formData.distanceKm}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Duration (minutes)</Form.Label>
                <Form.Control
                  name="durationMinutes"
                  type="number"
                  value={formData.durationMinutes}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="success" className="me-2">
            Update Route
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/admin/routes")}
          >
            Cancel
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditRoute;
