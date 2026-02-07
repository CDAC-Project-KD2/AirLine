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
import { fetchAllBookings, cancelBooking } from "../redux/slices/bookingSlice";

const AssistCancellation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allBookings } = useSelector((state) => state.bookings);
  
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  useEffect(() => {
    if (allBookings.length > 0) {
      const confirmedBookings = allBookings.filter(booking => 
        booking.status === 'CONFIRMED'
      );
      
      setRequests(confirmedBookings.map(booking => ({
        id: booking.bookingId,
        pnr: booking.pnr,
        passenger: booking.passenger?.fullName || 'N/A',
        flightNo: booking.flight?.flightNumber,
        route: booking.flight?.route ? 
          `${booking.flight.route.sourceAirport?.city} → ${booking.flight.route.destinationAirport?.city}` : 
          'N/A',
        date: booking.flight?.departureTime ? 
          new Date(booking.flight.departureTime).toLocaleDateString() : 
          'N/A',
        seat: booking.seatNumber,
        status: "Pending"
      })));
    }
  }, [allBookings]);

  const handleDecision = async (id, decision) => {
    if (decision === "Approved") {
      try {
        await dispatch(cancelBooking(id)).unwrap();
        setRequests((prev) =>
          prev.map((req) =>
            req.id === id ? { ...req, status: "Approved" } : req
          )
        );
      } catch (error) {
        alert('Failed to cancel booking');
      }
    } else {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: decision } : req
        )
      );
    }
  };

  return (
    <>
      {/* PAGE TITLE */}
      <h4 className="fw-bold mb-4">
        Assist Cancellation Requests
      </h4>

      <Card className="shadow-sm border-0">
        <Card.Body>
          {requests.length === 0 ? (
            <Alert variant="info">
              No cancellation requests at the moment.
            </Alert>
          ) : (
            <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>PNR</th>
                  <th>Passenger</th>
                  <th>Flight</th>
                  <th>Route</th>
                  <th>Date</th>
                  <th>Seat</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((req, index) => (
                  <tr key={req.id}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">
                      {req.pnr}
                    </td>
                    <td>{req.passenger}</td>
                    <td>{req.flightNo}</td>
                    <td>{req.route}</td>
                    <td>{req.date}</td>
                    <td>{req.seat}</td>
                    <td>
                      <Badge
                        bg={
                          req.status === "Pending"
                            ? "warning"
                            : req.status === "Approved"
                            ? "success"
                            : "danger"
                        }
                      >
                        {req.status}
                      </Badge>
                    </td>
                    <td>
                      {req.status === "Pending" ? (
                        <>
                          <Button
                            size="sm"
                            variant="success"
                            className="me-2"
                            onClick={() =>
                              handleDecision(
                                req.id,
                                "Approved"
                              )
                            }
                          >
                            Approve
                          </Button>

                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() =>
                              handleDecision(
                                req.id,
                                "Rejected"
                              )
                            }
                          >
                            Reject
                          </Button>
                        </>
                      ) : (
                        <Badge bg="secondary">
                          Completed
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
    </>
  );
};

export default AssistCancellation;
