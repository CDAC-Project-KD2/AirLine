import { useEffect } from "react";
import { Table, Button, Card, Badge, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights } from "../../redux/slices/flightSlice";
import { deleteFlight } from "../../redux/slices/adminSlice";

const FlightList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { flights, loading } = useSelector((state) => state.flights);

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  const handleDelete = async (flightId) => {
    if (window.confirm("Are you sure you want to delete this flight?")) {
      try {
        await dispatch(deleteFlight(flightId)).unwrap();
        // Refresh flights list after deletion
        dispatch(fetchFlights());
      } catch (error) {
        alert("Failed to delete flight: " + error);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-2">Loading flights...</p>
      </div>
    );
  }

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Manage Flights</h5>
          <Button onClick={() => navigate("/admin/flights/add")}>
            + Add Flight
          </Button>
        </div>

        <Table bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Flight No</th>
              <th>Route</th>
              <th>Aircraft</th>
              <th>Departure</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, index) => (
              <tr key={flight.flightId}>
                <td>{index + 1}</td>
                <td>{flight.flightNumber}</td>
                <td>
                  {flight.route?.sourceAirport?.city} → {flight.route?.destinationAirport?.city}
                </td>
                <td>{flight.aircraft?.model}</td>
                <td>
                  {flight.departureTime ? new Date(flight.departureTime).toLocaleString() : 'N/A'}
                </td>
                <td>₹ {flight.basePrice}</td>
                <td>
                  <Badge
                    bg={
                      flight.status === "ON_TIME"
                        ? "success"
                        : flight.status === "DELAYED"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {flight.status === "ON_TIME" ? "On Time" : flight.status}
                  </Badge>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() =>
                      navigate(`/admin/flights/edit/${flight.flightId}`, {
                        state: flight,
                      })
                    }
                  >
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="danger"
                    onClick={() => handleDelete(flight.flightId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {flights.length === 0 && (
          <div className="text-center py-4">
            <p className="text-muted">No flights found</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default FlightList;
