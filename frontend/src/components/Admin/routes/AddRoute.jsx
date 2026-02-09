import { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddRoute = () => {
  const navigate = useNavigate();

  const [route, setRoute] = useState({
    source: "",
    destination: "",
    distance: "",
    duration: "",
  });

  const handleChange = (e) => {
    setRoute({ ...route, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { source, destination, distance, duration } = route;
    if (!source || !destination || !distance || !duration) {
      alert("All fields are required");
      return;
    }

    console.log("New Route Added (Dummy):", route);
    navigate("/admin/routes");
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <h5 className="fw-bold mb-3">Add Route</h5>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Source</Form.Label>
                <Form.Control
                  name="source"
                  placeholder="Mumbai"
                  value={route.source}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  name="destination"
                  placeholder="Delhi"
                  value={route.destination}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Distance</Form.Label>
                <Form.Control
                  name="distance"
                  placeholder="1400 km"
                  value={route.distance}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  name="duration"
                  placeholder="2h 15m"
                  value={route.duration}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit">Save Route</Button>
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => navigate("/admin/routes")}
          >
            Cancel
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddRoute;
