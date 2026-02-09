import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Badge,
  Button,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights } from "../redux/slices/flightSlice";

const FlightSchedule = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { flights, loading, error } = useSelector((state) => state.flights);

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

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

  const handleView = (flight) => {
    navigate("/staff/flight-details", {
      state: { flight },
    });
  };

  const handleUpdateStatus = (flight) => {
    navigate("/staff/update-status", {
      state: { flight },
    });
  };

  if (loading) {
    return <div>Loading flights...</div>;
  }

  return (
    <>
      <h4 className="fw-bold mb-4">Assigned Flight Schedule</h4>

      {error && (
        <Alert variant="danger" className="small">
          {error}
        </Alert>
      )}

      {flights.length === 0 && !loading && (
        <Alert variant="info" className="small">
          No flights assigned to you.
        </Alert>
      )}

      {flights.length > 0 && (
        <Card className="shadow-sm border-0">
          <Card.Body>
            <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>Flight No</th>
                  <th>Route</th>
                  <th>Aircraft</th>
                  <th>Departure</th>
                  <th>Arrival</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {flights.map((flight) => (
                  <tr key={flight.flightId}>
                    <td className="fw-semibold">
                      {flight.flightNumber}
                    </td>
                    <td>{flight.route?.sourceAirport?.city} → {flight.route?.destinationAirport?.city}</td>
                    <td>{flight.aircraft?.model || 'N/A'}</td>
                    <td>{formatTime(flight.departureTime)}</td>
                    <td>{formatTime(flight.arrivalTime)}</td>
                    <td>
                      <Badge bg={getStatusVariant(flight.status)}>
                        {flight.status?.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        className="me-2"
                        onClick={() => handleView(flight)}
                      >
                        View
                      </Button>

                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() =>
                          handleUpdateStatus(flight)
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
      )}
    </>
  );
};

export default FlightSchedule;

