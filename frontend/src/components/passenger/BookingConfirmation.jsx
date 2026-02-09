import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Data passed from PaymentStatus
  const { flight, passenger, seat, pnr } = state || {};

  if (!flight || !passenger || !seat || !pnr) {
    return (
      <Card className="shadow-sm border-0">
        <Card.Body className="text-center py-5">
          <p className="text-muted">Invalid booking details or session expired.</p>
          <Button onClick={() => navigate("/passenger/dashboard")}>
            Go to Dashboard
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <h4 className="fw-bold mb-4 text-success">
        🎉 Booking Confirmed
      </h4>

      {/* PNR CARD */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body className="text-center">
          <h6 className="fw-bold">Booking Reference (PNR)</h6>
          <h2 className="fw-bold text-primary">{pnr}</h2>
          <Badge bg="success">Confirmed</Badge>
        </Card.Body>
      </Card>

      {/* TICKET DETAILS */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <h6 className="fw-bold mb-3">Ticket Details</h6>

          <Row className="mb-2">
            <Col md={6}>
              <strong>Passenger Name:</strong> {passenger.name}
            </Col>
            <Col md={6}>
              <strong>Email:</strong> {passenger.email}
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={6}>
              <strong>Airline:</strong> Air India
            </Col>
            <Col md={6}>
              <strong>Flight No:</strong> {flight.flightNumber}
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={6}>
              <strong>Route:</strong> {flight.route?.sourceAirport?.city} → {flight.route?.destinationAirport?.city}
            </Col>
            <Col md={6}>
              <strong>Seat No:</strong>{" "}
              <Badge bg="primary">{seat}</Badge>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={6}>
              <strong>Departure:</strong> {flight.departureTime ? new Date(flight.departureTime).toLocaleString() : 'N/A'}
            </Col>
            <Col md={6}>
              <strong>Arrival:</strong> {flight.arrivalTime ? new Date(flight.arrivalTime).toLocaleString() : 'N/A'}
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <strong>Price Paid:</strong> ₹ {flight.basePrice}
            </Col>
            <Col md={6}>
              <strong>Status:</strong>{" "}
              <Badge bg="success">Confirmed</Badge>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* ACTION BUTTONS */}
      <div className="mb-4">
        <Button
          variant="primary"
          className="me-2"
          onClick={() => navigate("/passenger/bookings")}
        >
          View My Bookings
        </Button>

        <Button
          variant="outline-secondary"
          onClick={() => navigate("/passenger/dashboard")}
        >
          Go to Dashboard
        </Button>
      </div>
    </>
  );
};

export default BookingConfirmation;
