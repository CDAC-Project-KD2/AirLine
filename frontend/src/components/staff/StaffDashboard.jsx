import { useState, useEffect } from "react";
import { Row, Col, Card, Table, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights } from "../redux/slices/flightSlice";
import { fetchAllBookings } from "../redux/slices/bookingSlice";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { flights, loading } = useSelector((state) => state.flights);
  const { allBookings } = useSelector((state) => state.bookings);
  
  const [summary, setSummary] = useState({
    assignedFlights: 0,
    todayCheckins: 0,
    delayedFlights: 0,
    cancelledFlights: 0
  });

  useEffect(() => {
    dispatch(fetchFlights());
    dispatch(fetchAllBookings());
  }, [dispatch]);

  useEffect(() => {
    if (flights.length > 0) {
      const today = new Date().toDateString();
      const todayBookings = allBookings.filter(booking => 
        new Date(booking.bookingDate).toDateString() === today
      );
      
      setSummary({
        assignedFlights: flights.length,
        todayCheckins: todayBookings.length,
        delayedFlights: flights.filter(f => f.status === 'DELAYED').length,
        cancelledFlights: flights.filter(f => f.status === 'CANCELLED').length
      });
    }
  }, [flights, allBookings]);

  const getStatusVariant = (status) => {
    if (status === "ON_TIME") return "success";
    if (status === "DELAYED") return "warning";
    return "danger";
  };

  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* PAGE TITLE */}
      <h4 className="fw-bold mb-4">Staff Dashboard</h4>

      {/* SUMMARY CARDS */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="shadow-sm border-0 text-center">
            <Card.Body>
              <h6 className="text-muted">Assigned Flights</h6>
              <h3 className="fw-bold text-primary">{summary.assignedFlights}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm border-0 text-center">
            <Card.Body>
              <h6 className="text-muted">Today's Check-ins</h6>
              <h3 className="fw-bold text-success">{summary.todayCheckins}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm border-0 text-center">
            <Card.Body>
              <h6 className="text-muted">Delayed Flights</h6>
              <h3 className="fw-bold text-warning">{summary.delayedFlights}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm border-0 text-center">
            <Card.Body>
              <h6 className="text-muted">Cancelled Flights</h6>
              <h3 className="fw-bold text-danger">{summary.cancelledFlights}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ASSIGNED FLIGHTS */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <h6 className="fw-bold mb-3">Assigned Flights</h6>

          <Table bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>Flight No</th>
                <th>Route</th>
                <th>Aircraft</th>
                <th>Departure</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {flights.slice(0, 5).map((flight) => (
                <tr key={flight.flightId}>
                  <td className="fw-semibold">{flight.flightNumber}</td>
                  <td>{flight.route?.sourceAirport?.city} → {flight.route?.destinationAirport?.city}</td>
                  <td>{flight.aircraft?.model || 'N/A'}</td>
                  <td>{formatTime(flight.departureTime)}</td>
                  <td>
                    <Badge bg={getStatusVariant(flight.status)}>
                      {flight.status?.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      className="me-2"
                      onClick={() =>
                        navigate("/staff/flight-details", {
                          state: { flight },
                        })
                      }
                    >
                      View
                    </Button>

                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() =>
                        navigate("/staff/update-status", {
                          state: { flight },
                        })
                      }
                    >
                      Update Status
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* QUICK ACTIONS */}
      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm border-0 text-center h-100">
            <Card.Body>
              <h6 className="fw-bold">Check-In Handling</h6>
              <p className="text-muted">
                Manage passenger check-ins
              </p>
              <Button
                variant="primary"
                onClick={() => navigate("/staff/checkin")}
              >
                Go to Check-In
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 text-center h-100">
            <Card.Body>
              <h6 className="fw-bold">Passenger List</h6>
              <p className="text-muted">
                View passengers for flights
              </p>
              <Button
                variant="primary"
                onClick={() => navigate("/staff/passengers")}
              >
                View Passengers
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 text-center h-100">
            <Card.Body>
              <h6 className="fw-bold">Assist Cancellations</h6>
              <p className="text-muted">
                Help with booking cancellations
              </p>
              <Button
                variant="danger"
                onClick={() => navigate("/staff/cancellations")}
              >
                Assist Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default StaffDashboard;
