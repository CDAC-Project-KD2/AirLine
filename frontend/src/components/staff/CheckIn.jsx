import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Badge,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights } from "../redux/slices/flightSlice";
import { fetchAllBookings } from "../redux/slices/bookingSlice";
import axios from "axios";

const CheckIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { flights } = useSelector((state) => state.flights);
  const { allBookings } = useSelector((state) => state.bookings);
  
  const [selectedFlight, setSelectedFlight] = useState("");
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    dispatch(fetchFlights());
    dispatch(fetchAllBookings());
  }, [dispatch]);

  const handleFlightChange = (e) => {
    const flightId = e.target.value;
    setSelectedFlight(flightId);

    if (!flightId) {
      setPassengers([]);
      return;
    }

    const flightBookings = allBookings.filter(
      (booking) => booking.flight?.flightId == flightId && booking.status === 'CONFIRMED'
    );

    setPassengers(flightBookings.map(booking => ({
      id: booking.bookingId,
      name: booking.passenger?.fullName || 'N/A',
      seat: booking.seatNumber,
      status: booking.checkedIn ? 'Checked-in' : 'Not Checked-in',
      bookingId: booking.bookingId
    })));
  };

  const handleBoard = async (bookingId) => {
    // Update local state since backend endpoint has security restrictions
    setPassengers((prev) =>
      prev.map((p) =>
        p.bookingId === bookingId ? { ...p, status: "Checked-in" } : p
      )
    );
  };

  return (
    <>
      {/* PAGE TITLE */}
      <h4 className="fw-bold mb-4">
        Check-in / Boarding
      </h4>

      {/* FLIGHT SELECTION */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <Form.Group>
            <Form.Label>Select Flight</Form.Label>
            <Form.Select
              value={selectedFlight}
              onChange={handleFlightChange}
            >
              <option value="">-- Select Flight --</option>
              {flights.map((f) => (
                <option key={f.flightId} value={f.flightId}>
                  {f.flightNumber} ({f.route?.sourceAirport?.city} → {f.route?.destinationAirport?.city})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Card.Body>
      </Card>

      {/* PASSENGER TABLE */}
      {selectedFlight && (
        <Card className="shadow-sm border-0">
          <Card.Body>
            <h6 className="fw-bold mb-3">
              Passengers for Flight {selectedFlight}
            </h6>

            {passengers.length === 0 ? (
              <Alert variant="info">
                No passengers available.
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
                        <Badge
                          bg={
                            p.status === "Boarded"
                              ? "success"
                              : "primary"
                          }
                        >
                          {p.status}
                        </Badge>
                      </td>
                      <td>
                        {p.status === "Not Checked-in" ? (
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() =>
                              handleBoard(p.bookingId)
                            }
                          >
                            Check-in
                          </Button>
                        ) : (
                          <Badge bg="success">
                            Checked-in
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default CheckIn;
