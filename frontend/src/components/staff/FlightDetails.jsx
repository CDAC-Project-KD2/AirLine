import { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Badge,
  Button,
  Alert,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const FlightDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Validate flight data
  const flight = state?.flight;

  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!flight) {
      navigate("/staff");
      return;
    }

    fetchPassengers();
  }, [flight, navigate]);

  const fetchPassengers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/bookings`);
      const flightBookings = response.data.filter(booking => 
        booking.flight?.flightId === flight.flightId && 
        booking.status === 'CONFIRMED'
      );
      
      setPassengers(flightBookings.map(booking => ({
        id: booking.bookingId,
        name: booking.passenger?.fullName || 'N/A',
        seat: booking.seatNumber,
        status: booking.checkedIn ? 'Checked-in' : 'Not Checked-in',
        bookingId: booking.bookingId
      })));
    } catch (error) {
      console.error('Error fetching passengers:', error);
      setPassengers([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status) => {
    if (status === "Boarded") return "success";
    if (status === "Checked-in") return "primary";
    return "secondary";
  };

  const handleCheckIn = async (bookingId) => {
    // Update local state since backend endpoint has security restrictions
    setPassengers((prev) =>
      prev.map((p) =>
        p.bookingId === bookingId ? { ...p, status: "Checked-in" } : p
      )
    );
  };

  const handleBoard = (id) => {
    setPassengers((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "Boarded" } : p
      )
    );
  };

  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
  };

  if (!flight) {
    return (
      <Alert variant="danger">
        Invalid flight access.
      </Alert>
    );
  }

  return (
    <>
      {/* PAGE TITLE */}
      <h4 className="fw-bold mb-4">Flight Details</h4>

      {/* FLIGHT INFORMATION */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <h6 className="fw-bold mb-3">Flight Information</h6>

          <Row className="mb-2">
            <Col md={4}>
              <strong>Flight No:</strong> {flight.flightNumber}
            </Col>
            <Col md={4}>
              <strong>Route:</strong> {flight.route?.sourceAirport?.city} → {flight.route?.destinationAirport?.city}
            </Col>
            <Col md={4}>
              <strong>Aircraft:</strong> {flight.aircraft?.model || 'N/A'}
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <strong>Departure:</strong> {formatTime(flight.departureTime)}
            </Col>
            <Col md={4}>
              <strong>Arrival:</strong> {formatTime(flight.arrivalTime)}
            </Col>
            <Col md={4}>
              <strong>Status:</strong>{" "}
              <Badge bg="info">{flight.status?.replace('_', ' ')}</Badge>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* PASSENGER LIST */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h6 className="fw-bold mb-3">Passenger List</h6>

          {loading ? (
            <div>Loading passengers...</div>
          ) : passengers.length === 0 ? (
            <Alert variant="info">
              No passengers booked for this flight.
            </Alert>
          ) : (
            <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Passenger Name</th>
                  <th>Seat</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {passengers.map((p, index) => (
                  <tr key={p.id}>
                    <td>{index + 1}</td>
                    <td>{p.name}</td>
                    <td>{p.seat}</td>
                    <td>
                      <Badge bg={getStatusVariant(p.status)}>
                        {p.status}
                      </Badge>
                    </td>
                    <td>
                      {p.status === "Not Checked-in" && (
                        <Button
                          size="sm"
                          onClick={() => handleCheckIn(p.bookingId)}
                        >
                          Check-in
                        </Button>
                      )}

                      {p.status === "Checked-in" && (
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() => handleBoard(p.id)}
                        >
                          Board
                        </Button>
                      )}

                      {p.status === "Boarded" && (
                        <Badge bg="success">Completed</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* ACTION BUTTONS */}
      <div className="mt-3">
        <Button
          variant="secondary"
          className="me-2"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <Button
          variant="warning"
          onClick={() =>
            navigate("/staff/update-status", {
              state: { flight },
            })
          }
        >
          Update Flight Status
        </Button>
      </div>
    </>
  );
};

export default FlightDetails;
