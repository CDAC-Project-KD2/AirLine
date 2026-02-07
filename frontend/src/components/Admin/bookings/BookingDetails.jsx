import { Card, Row, Col, Button, Badge } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cancelBooking } from "../../redux/slices/bookingSlice";

const BookingDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation(); // booking data from list
  const [status, setStatus] = useState(state?.status || "CONFIRMED");

  if (!state) {
    return <p>Booking not found</p>;
  }

  const handleCancel = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      await dispatch(cancelBooking(state.bookingId)).unwrap();
      setStatus("CANCELLED");
      alert("Booking cancelled successfully.");
    } catch (error) {
      alert("Failed to cancel booking: " + error);
    }
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Booking Details</h5>
          <Badge bg={status === "CONFIRMED" ? "success" : status === "CANCELLED" ? "danger" : "secondary"}>
            {status}
          </Badge>
        </div>

        {/* PASSENGER DETAILS */}
        <Row className="mb-3">
          <Col md={6}>
            <p><strong>Passenger Name:</strong> {state.passenger?.firstName} {state.passenger?.lastName}</p>
            <p><strong>PNR:</strong> {state.pnr}</p>
            <p><strong>Booking Date:</strong> {new Date(state.bookingDate).toLocaleDateString()}</p>
            <p><strong>Seat Number:</strong> {state.seatNumber || 'N/A'}</p>
          </Col>

          <Col md={6}>
            <p><strong>Flight No:</strong> {state.flight?.flightNumber}</p>
            <p><strong>Route:</strong> {state.flight?.route?.sourceAirport?.city} → {state.flight?.route?.destinationAirport?.city}</p>
            <p><strong>Departure:</strong> {state.flight?.departureTime ? new Date(state.flight.departureTime).toLocaleString() : 'N/A'}</p>
            <p><strong>Amount:</strong> ₹ {state.totalAmount}</p>
          </Col>
        </Row>

        {/* ADMIN ACTION */}
        <div className="mt-3">
          {status === "CONFIRMED" && (
            <Button variant="danger" onClick={handleCancel}>
              Cancel Booking (Admin Override)
            </Button>
          )}

          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => navigate("/admin/bookings")}
          >
            Back to List
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookingDetails;
