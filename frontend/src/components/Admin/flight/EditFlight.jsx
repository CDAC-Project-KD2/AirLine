import { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateFlight, fetchFlights } from "../../redux/slices/flightSlice";

const EditFlight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { id } = useParams();

  const { loading } = useSelector((state) => state.flights);
  const existingFlight = state;

  const [flight, setFlight] = useState({
    flightNumber: existingFlight?.flightNumber || "",
    basePrice: existingFlight?.basePrice || "",
    status: existingFlight?.status || "ON_TIME",
  });

  useEffect(() => {
    if (!existingFlight) {
      alert("Flight data not found");
      navigate("/admin/flights");
    }
  }, [existingFlight, navigate]);

  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(updateFlight({
        id: existingFlight.flightId,
        flightData: {
          ...existingFlight,
          flightNumber: flight.flightNumber,
          basePrice: parseFloat(flight.basePrice),
          status: flight.status,
        }
      })).unwrap();
      
      alert("Flight updated successfully!");
      dispatch(fetchFlights()); // Refresh the list
      navigate("/admin/flights");
    } catch (error) {
      alert("Failed to update flight: " + error);
    }
  };

  if (!existingFlight) return null;

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <h5 className="fw-bold mb-3">Edit Flight</h5>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Flight Number</Form.Label>
                <Form.Control
                  name="flightNumber"
                  value={flight.flightNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Base Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="basePrice"
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
                <Form.Label>Route</Form.Label>
                <Form.Control
                  value={`${existingFlight.route?.sourceAirport?.city} → ${existingFlight.route?.destinationAirport?.city}`}
                  disabled
                />
                <Form.Text className="text-muted">
                  Route cannot be changed
                </Form.Text>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Aircraft</Form.Label>
                <Form.Control
                  value={existingFlight.aircraft?.model}
                  disabled
                />
                <Form.Text className="text-muted">
                  Aircraft cannot be changed
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={flight.status}
                  onChange={handleChange}
                >
                  <option value="ON_TIME">On Time</option>
                  <option value="DELAYED">Delayed</option>
                  <option value="CANCELLED">Cancelled</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" /> Updating...
              </>
            ) : (
              "Update Flight"
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

export default EditFlight;