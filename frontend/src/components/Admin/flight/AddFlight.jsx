import { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFlight, clearFlightError, fetchFlights } from "../../redux/slices/flightSlice";

const AddFlight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.flights);

  const [flight, setFlight] = useState({
    flightNumber: "",
    routeId: "",
    aircraftId: "",
    departureTime: "",
    arrivalTime: "",
    basePrice: "",
  });

  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { flightNumber, routeId, aircraftId, departureTime, arrivalTime, basePrice } = flight;
    if (!flightNumber || !routeId || !aircraftId || !departureTime || !arrivalTime || !basePrice) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await dispatch(addFlight({
        flightNumber,
        route: { routeId: parseInt(routeId) },
        aircraft: { aircraftId: parseInt(aircraftId) },
        departureTime,
        arrivalTime,
        basePrice: parseFloat(basePrice),
        status: "ON_TIME",
        availableSeats: aircraftId === "1" ? 180 : 160,
        totalSeats: aircraftId === "1" ? 180 : 160
      })).unwrap();
      
      alert("Flight added successfully!");
      dispatch(fetchFlights()); // Refresh the list
      navigate("/admin/flights");
    } catch (error) {
      alert("Failed to add flight: " + error);
    }
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <h5 className="fw-bold mb-3">Add Flight</h5>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Flight Number</Form.Label>
                <Form.Control
                  name="flightNumber"
                  placeholder="AI104"
                  value={flight.flightNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Route</Form.Label>
                <Form.Select
                  name="routeId"
                  value={flight.routeId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Route</option>
                  <option value="1">Mumbai → Delhi</option>
                  <option value="2">Delhi → Bangalore</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Aircraft</Form.Label>
                <Form.Select
                  name="aircraftId"
                  value={flight.aircraftId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Aircraft</option>
                  <option value="1">Boeing 737-800 (180 seats)</option>
                  <option value="2">Airbus A320 (160 seats)</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Base Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="basePrice"
                  placeholder="5500"
                  value={flight.basePrice}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Departure Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="departureTime"
                  value={flight.departureTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Arrival Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="arrivalTime"
                  value={flight.arrivalTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" /> Saving...
              </>
            ) : (
              "Save Flight"
            )}
          </Button>

          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => navigate("/admin/flights")}
          >
            Cancel
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddFlight;
