import { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col, Badge } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const flight = state?.flight;

  const [seat, setSeat] = useState("");
  const [bookedSeats, setBookedSeats] = useState([]);
  const [passenger, setPassenger] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (flight?.flightId) {
      fetchBookedSeats();
    }
  }, [flight]);

  const fetchBookedSeats = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/bookings/booked-seats/${flight.flightId}`);
      console.log('Fetched booked seats:', response.data);
      setBookedSeats(response.data);
    } catch (error) {
      console.error('Error fetching booked seats:', error);
      setBookedSeats([]); // Empty array instead of dummy data
    }
  };

  if (!flight) {
    return <p>No flight selected.</p>;
  }

  // Generate seat layout dynamically for 48 seats (12 rows, 4 seats per row)
  const generateSeatLayout = () => {
    const layout = [];
    for (let row = 1; row <= 12; row++) {
      layout.push([`${row}A`, `${row}B`, "", `${row}C`, `${row}D`]);
    }
    return layout;
  };
  
  const seatLayout = generateSeatLayout();

  // Dummy booked seats
  // const bookedSeats = ["2B", "3C"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passenger.name || !passenger.email || !seat) {
      alert("Please complete all details");
      return;
    }

    // Re-fetch booked seats before submitting to ensure real-time accuracy
    fetchBookedSeats().then(() => {
      if (bookedSeats.includes(seat)) {
        alert("This seat was just booked by another user. Please select another seat.");
        setSeat(""); // Clear selected seat
        return;
      }

      navigate("/passenger/payment", {
        state: {
          flight,
          passenger,
          seat,
        },
      });
    });
  };

  return (
    <>
      <h4 className="fw-bold mb-4">Booking Form</h4>

      {/* FLIGHT DETAILS */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <h6 className="fw-bold mb-3">Flight Details</h6>
          <Row>
            <Col md={4}><strong>Flight:</strong> {flight.flightNumber}</Col>
            <Col md={4}><strong>Departure:</strong> {flight.departureTime ? new Date(flight.departureTime).toLocaleString() : 'N/A'}</Col>
            <Col md={4}><strong>Price:</strong> ₹ {flight.basePrice}</Col>
          </Row>
        </Card.Body>
      </Card>

      {/* PASSENGER DETAILS */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <h6 className="fw-bold mb-3">Passenger Details</h6>

          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    value={passenger.name}
                    onChange={(e) =>
                      setPassenger({ ...passenger, name: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={passenger.email}
                    onChange={(e) =>
                      setPassenger({ ...passenger, email: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* SEAT SELECTION */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <h6 className="fw-bold mb-3">Seat Selection</h6>
          
          {bookedSeats.length > 0 && (
            <p className="text-muted mb-3">
              Booked seats: {bookedSeats.join(', ')}
            </p>
          )}

          <div className="seat-map">
            {seatLayout.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="d-flex justify-content-center mb-2"
              >
                {row.map((s, index) =>
                  s === "" ? (
                    <div
                      key={index}
                      style={{ width: "40px" }}
                    ></div>
                  ) : (
                    <Button
                      key={s}
                      size="sm"
                      className="mx-1"
                      variant={
                        bookedSeats.includes(s)
                          ? "secondary"
                          : seat === s
                          ? "success"
                          : "outline-primary"
                      }
                      disabled={bookedSeats.includes(s)}
                      onClick={() => setSeat(s)}
                      style={{ width: "45px" }}
                    >
                      {s}
                    </Button>
                  )
                )}
              </div>
            ))}
          </div>

          {seat && (
            <p className="mt-3">
              Selected Seat: <Badge bg="success">{seat}</Badge>
            </p>
          )}
        </Card.Body>
      </Card>

      {/* ACTION BUTTONS */}
      <div className="mb-4">
        <Button variant="primary" onClick={handleSubmit}>
          Confirm Booking
        </Button>
        <Button
          variant="secondary"
          className="ms-2"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>
    </>
  );
};

export default BookingForm;
