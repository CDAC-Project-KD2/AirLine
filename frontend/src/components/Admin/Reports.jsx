import { Row, Col, Card, Table, ProgressBar, Badge, Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../redux/slices/adminSlice";
import { fetchFlights } from "../redux/slices/flightSlice";
import { fetchAllBookings } from "../redux/slices/bookingSlice";

const Reports = () => {
  const dispatch = useDispatch();
  const { dashboardStats, loading } = useSelector((state) => state.admin);
  const { flights } = useSelector((state) => state.flights);
  const { allBookings } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchFlights());
    dispatch(fetchAllBookings());
  }, [dispatch]);

  // Calculate real occupancy data from flights and bookings
  const calculateOccupancyData = () => {
    const routeOccupancy = {};
    
    flights.forEach(flight => {
      const routeKey = `${flight.route?.sourceAirport?.city} → ${flight.route?.destinationAirport?.city}`;
      if (!routeOccupancy[routeKey]) {
        routeOccupancy[routeKey] = { totalSeats: 0, bookedSeats: 0 };
      }
      
      routeOccupancy[routeKey].totalSeats += flight.totalSeats || 0;
      
      const flightBookings = allBookings.filter(booking => 
        booking.flight?.flightId === flight.flightId && booking.status === 'CONFIRMED'
      );
      routeOccupancy[routeKey].bookedSeats += flightBookings.length;
    });
    
    return Object.entries(routeOccupancy).map(([route, data]) => ({
      route,
      occupancy: data.totalSeats > 0 ? Math.round((data.bookedSeats / data.totalSeats) * 100) : 0
    })).slice(0, 5); // Top 5 routes
  };

  // Calculate cancellation stats from real data
  const calculateCancellationStats = () => {
    const flightStats = {};
    
    flights.forEach(flight => {
      const flightBookings = allBookings.filter(booking => 
        booking.flight?.flightId === flight.flightId
      );
      
      const totalBookings = flightBookings.length;
      const cancelledBookings = flightBookings.filter(booking => 
        booking.status === 'CANCELLED'
      ).length;
      
      if (totalBookings > 0) {
        flightStats[flight.flightNumber] = {
          flightNo: flight.flightNumber,
          total: totalBookings,
          cancelled: cancelledBookings
        };
      }
    });
    
    return Object.values(flightStats).slice(0, 5); // Top 5 flights with bookings
  };

  // Format revenue for display
  const formatRevenue = (amount) => {
    if (amount >= 100000) {
      return `₹ ${(amount / 100000).toFixed(1)} L`;
    } else if (amount >= 1000) {
      return `₹ ${(amount / 1000).toFixed(1)} K`;
    }
    return `₹ ${amount}`;
  };

  const occupancyData = calculateOccupancyData();
  const cancellationStats = calculateCancellationStats();

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-2">Loading reports...</p>
      </div>
    );
  }

  return (
    <>
      {/* PAGE TITLE */}
      <h4 className="fw-bold mb-4">Reports Dashboard</h4>

      {/* REVENUE REPORTS */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted">Total Revenue</h6>
              <h3 className="fw-bold text-success">
                {formatRevenue(dashboardStats.totalRevenue)}
              </h3>
              <small className="text-muted">All-time earnings</small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted">Total Bookings</h6>
              <h3 className="fw-bold text-primary">
                {dashboardStats.totalBookings}
              </h3>
              <small className="text-muted">All bookings</small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted">Total Flights</h6>
              <h3 className="fw-bold text-warning">
                {dashboardStats.totalFlights}
              </h3>
              <small className="text-muted">Active flights</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* FLIGHT OCCUPANCY */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <h6 className="fw-bold mb-3">Flight Occupancy</h6>

          {occupancyData.length === 0 ? (
            <p className="text-muted text-center">No occupancy data available</p>
          ) : (
            occupancyData.map((item, index) => (
              <div key={index} className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>{item.route}</span>
                  <span className="fw-semibold">{item.occupancy}%</span>
                </div>
                <ProgressBar
                  now={item.occupancy}
                  variant={
                    item.occupancy >= 80
                      ? "success"
                      : item.occupancy >= 70
                      ? "warning"
                      : "danger"
                  }
                />
              </div>
            ))
          )}
        </Card.Body>
      </Card>

      {/* CANCELLATION STATISTICS */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h6 className="fw-bold mb-3">Cancellation Statistics</h6>

          <Table bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>Flight No</th>
                <th>Total Bookings</th>
                <th>Cancelled</th>
                <th>Cancellation Rate</th>
              </tr>
            </thead>
            <tbody>
              {cancellationStats.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted">No cancellation data available</td>
                </tr>
              ) : (
                cancellationStats.map((item, index) => {
                  const rate = item.total > 0 ? Math.round((item.cancelled / item.total) * 100) : 0;

                  return (
                    <tr key={index}>
                      <td>{item.flightNo}</td>
                      <td>{item.total}</td>
                      <td>
                        <Badge bg="danger">{item.cancelled}</Badge>
                      </td>
                      <td>
                        <Badge
                          bg={
                            rate < 10
                              ? "success"
                              : rate < 20
                              ? "warning"
                              : "danger"
                          }
                        >
                          {rate}%
                        </Badge>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default Reports;
