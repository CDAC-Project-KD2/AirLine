import { Card, Table, Button, Badge } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AvailableFlights = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { flights: flightList } = useSelector((state) => state.flights);

  // Use flights from Redux store and filter based on search parameters
  const allFlights = flightList || [];
  const searchParams = state?.searchParams;
  
  const flights = allFlights.filter(flight => {
    if (!searchParams) return true; // Show all if no search params
    
    const sourceMatch = !searchParams.source || 
      flight.route?.sourceAirport?.city === searchParams.source;
    const destinationMatch = !searchParams.destination || 
      flight.route?.destinationAirport?.city === searchParams.destination;
    
    return sourceMatch && destinationMatch;
  });

  if (flights.length === 0) {
    return <p>No flights available. Please search again.</p>;
  }

  return (
    <>
      <h4 className="fw-bold mb-4">Available Flights</h4>

      <Card className="shadow-sm border-0">
        <Card.Body>
          <Table bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>Airline</th>
                <th>Flight No</th>
                <th>Route</th>
                <th>Departure</th>
                <th>Price</th>
                <th>Seats</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {flights.map((flight) => (
                <tr key={flight.flightId}>
                  <td>B Airways</td>
                  <td>{flight.flightNumber}</td>
                  <td>
                    {flight.route?.sourceAirport?.city} → {flight.route?.destinationAirport?.city}
                  </td>
                  <td>
                    {flight.departureTime ? new Date(flight.departureTime).toLocaleString() : 'N/A'}
                  </td>
                  <td>₹ {flight.basePrice}</td>
                  <td>
                    {flight.availableSeats > 0 ? (
                      <>
                        <Badge bg="success" className="me-2">{flight.availableSeats} available</Badge>
                        <small className="text-muted">of {flight.totalSeats}</small>
                      </>
                    ) : (
                      <Badge bg="danger">Sold Out</Badge>
                    )}
                  </td>
                  <td>
                    <Button
                      size="sm"
                      disabled={flight.availableSeats === 0}
                      onClick={() =>
                        navigate("/passenger/book", {
                          state: {
                            flight,
                          },
                        })
                      }
                    >
                      Book Now
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default AvailableFlights;
