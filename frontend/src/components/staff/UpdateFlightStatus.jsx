import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  Badge,
  Alert,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateFlightStatus } from "../redux/slices/flightSlice";

const UpdateFlightStatus = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  // Flight passed from Schedule / Details page
  const flight = state?.flight;

  const [status, setStatus] = useState(flight?.status || "ON_TIME");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation: block direct access
  useEffect(() => {
    if (!flight) {
      navigate("/staff");
    }
  }, [flight, navigate]);

  if (!flight) return null;

  const getBadgeVariant = (s) => {
    if (s === "ON_TIME") return "success";
    if (s === "DELAYED") return "warning";
    return "danger";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (
      (status === "DELAYED" || status === "CANCELLED") &&
      reason.trim() === ""
    ) {
      setError("Reason is required for delayed or cancelled flights.");
      setLoading(false);
      return;
    }

    try {
      await dispatch(updateFlightStatus({ 
        id: flight.flightId, 
        status 
      })).unwrap();
      
      setSuccess(
        `Flight ${flight.flightNumber} status updated to "${status.replace('_', ' ')}".`
      );

      // Go back after short delay
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      setError(error || 'Failed to update flight status');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
  };

  return (
    <>
      <h4 className="fw-bold mb-4">Update Flight Status</h4>

      {/* FLIGHT INFO */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <h6 className="fw-bold mb-3">Flight Information</h6>

          <Row>
            <Col md={4}>
              <strong>Flight No:</strong> {flight.flightNumber}
            </Col>
            <Col md={4}>
              <strong>Route:</strong> {flight.route?.sourceAirport?.city} → {flight.route?.destinationAirport?.city}
            </Col>
            <Col md={4}>
              <strong>Departure:</strong> {formatTime(flight.departureTime)}
            </Col>
          </Row>

          <div className="mt-2">
            <strong>Current Status:</strong>{" "}
            <Badge bg={getBadgeVariant(status)}>
              {status.replace('_', ' ')}
            </Badge>
          </div>
        </Card.Body>
      </Card>

      {/* UPDATE FORM */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h6 className="fw-bold mb-3">Change Status</h6>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Flight Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={loading}
              >
                <option value="ON_TIME">On Time</option>
                <option value="DELAYED">Delayed</option>
                <option value="CANCELLED">Cancelled</option>
              </Form.Select>
            </Form.Group>

            {(status === "DELAYED" || status === "CANCELLED") && (
              <Form.Group className="mb-3">
                <Form.Label>
                  Reason for {status.replace('_', ' ')}
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={`Enter reason for ${status.toLowerCase().replace('_', ' ')}`}
                  disabled={loading}
                />
              </Form.Group>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Status'}
            </Button>
            <Button
              variant="secondary"
              className="ms-2"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default UpdateFlightStatus;
