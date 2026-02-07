import { useEffect } from "react";
import { Row, Col, Card, Badge, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBookings } from "../redux/slices/bookingSlice";

const PassengerDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { myBookings, loading } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  // Refresh bookings when component becomes visible
  useEffect(() => {
    const handleFocus = () => {
      dispatch(fetchMyBookings());
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [dispatch]);

  // Filter bookings for upcoming and recent
  const currentDate = new Date();
  console.log('All bookings:', myBookings); // Debug log
  
  const upcomingTrips = myBookings.filter(booking => {
    if (booking.status !== 'CONFIRMED' || !booking.flight?.departureTime) return false;
    const departureDate = new Date(booking.flight.departureTime);
    return departureDate > currentDate; // Future flights only
  });

  const recentBookings = myBookings.filter(booking => {
    return booking.status === 'CONFIRMED';
  }).slice(-4).reverse(); // Last 4 bookings regardless of date

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-2">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <>
      {/* PAGE TITLE */}
      <h4 className="fw-bold mb-4">My Dashboard</h4>

      {/* UPCOMING TRIPS */}
      <Row className="mb-4">
        <Col>
          <h6 className="fw-bold mb-3">Upcoming Trips</h6>

          {upcomingTrips.length === 0 ? (
            <p className="text-muted">No upcoming trips</p>
          ) : (
            <Row className="g-3">
              {upcomingTrips.map((booking) => (
                <Col md={6} key={booking.bookingId}>
                  <Card className="shadow-sm border-0 h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between mb-2">
                        <h6 className="fw-bold mb-0">
                          {booking.flight?.route?.sourceAirport?.city} → {booking.flight?.route?.destinationAirport?.city}
                        </h6>
                        <Badge bg="success">{booking.status}</Badge>
                      </div>

                      <p className="mb-1">
                        <strong>Flight:</strong> {booking.flight?.flightNumber}
                      </p>
                      <p className="mb-1">
                        <strong>Date:</strong> {booking.flight?.departureTime ? new Date(booking.flight.departureTime).toLocaleDateString() : 'N/A'}
                      </p>
                      <p className="mb-2">
                        <strong>Time:</strong> {booking.flight?.departureTime ? new Date(booking.flight.departureTime).toLocaleTimeString() : 'N/A'}
                      </p>
                      <small className="text-muted">PNR: {booking.pnr}</small>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>

      {/* RECENT BOOKINGS */}
      <Row>
        <Col>
          <h6 className="fw-bold mb-3">Recent Bookings</h6>

          <Row className="g-3">
            {recentBookings.map((booking) => (
              <Col md={6} key={booking.bookingId}>
                <Card className="shadow-sm border-0 h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <h6 className="fw-bold mb-0">
                        {booking.flight?.route?.sourceAirport?.city} → {booking.flight?.route?.destinationAirport?.city}
                      </h6>
                      <Badge
                        bg={
                          booking.status === "CONFIRMED"
                            ? "primary"
                            : "danger"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </div>

                    <p className="mb-1">
                      <strong>Flight:</strong> {booking.flight?.flightNumber}
                    </p>
                    <p className="mb-1">
                      <strong>Date:</strong> {new Date(booking.flight?.departureTime).toLocaleDateString()}
                    </p>

                    <small className="text-muted">
                      PNR: {booking.pnr}
                    </small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default PassengerDashboard;
