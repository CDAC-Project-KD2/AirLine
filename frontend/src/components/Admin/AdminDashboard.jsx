import { useEffect } from "react";
import { Row, Col, Card, Table, Badge, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../redux/slices/adminSlice";
import { fetchFlights } from "../redux/slices/flightSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { dashboardStats, loading } = useSelector((state) => state.admin);
  const { flights } = useSelector((state) => state.flights);

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchFlights());
  }, [dispatch]);

  // Format revenue for display
  const formatRevenue = (amount) => {
    if (amount >= 100000) {
      return `₹ ${(amount / 100000).toFixed(1)} L`;
    } else if (amount >= 1000) {
      return `₹ ${(amount / 1000).toFixed(1)} K`;
    }
    return `₹ ${amount}`;
  };

  // Calculate occupancy rate
  const calculateOccupancyRate = () => {
    if (dashboardStats.totalBookings === 0) return 0;
    const totalCapacity = flights.reduce((sum, flight) => sum + (flight.totalSeats || 0), 0);
    if (totalCapacity === 0) return 0;
    return Math.round((dashboardStats.totalBookings / totalCapacity) * 100);
  };

  // Get recent flights with status
  const recentFlights = flights.slice(0, 3).map(flight => ({
    id: flight.flightNumber,
    route: `${flight.route?.sourceAirport?.city} → ${flight.route?.destinationAirport?.city}`,
    status: flight.status === 'ON_TIME' ? 'On Time' : flight.status
  }));

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-2">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <>
      {/* PAGE TITLE */}
      <h4 className="fw-bold mb-4">Admin Dashboard</h4>

      {/* KPI CARDS */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted">Total Flights</h6>
              <h3 className="fw-bold text-primary">
                {dashboardStats.totalFlights}
              </h3>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted">Total Bookings</h6>
              <h3 className="fw-bold text-success">
                {dashboardStats.totalBookings}
              </h3>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted">Cancellations</h6>
              <h3 className="fw-bold text-danger">
                {dashboardStats.cancelledBookings}
              </h3>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted">Total Revenue</h6>
              <h3 className="fw-bold text-warning">
                {formatRevenue(dashboardStats.totalRevenue)}
              </h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* RECENT FLIGHTS */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <h6 className="fw-bold mb-3">Recent Flights Status</h6>
          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>Flight No</th>
                <th>Route</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentFlights.map((flight, index) => (
                <tr key={index}>
                  <td>{flight.id}</td>
                  <td>{flight.route}</td>
                  <td>
                    <Badge
                      bg={
                        flight.status === "On Time"
                          ? "success"
                          : flight.status === "Delayed"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {flight.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* QUICK INFO */}
      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="fw-bold mb-3">Flight Occupancy</h6>
              <p className="mb-2">Average Occupancy Rate</p>
              <h4 className="fw-bold text-success">{calculateOccupancyRate()}%</h4>
              <small className="text-muted">
                Based on current bookings vs total capacity
              </small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="fw-bold mb-3">Cancellations Overview</h6>
              <p className="mb-2">Total Cancellations</p>
              <h4 className="fw-bold text-danger">{dashboardStats.cancelledBookings}</h4>
              <small className="text-muted">
                {dashboardStats.totalBookings > 0 
                  ? `${Math.round((dashboardStats.cancelledBookings / dashboardStats.totalBookings) * 100)}% of total bookings`
                  : 'No bookings yet'
                }
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
