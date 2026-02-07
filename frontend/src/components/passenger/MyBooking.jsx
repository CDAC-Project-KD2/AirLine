import { Card, Table, Button, Badge, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBookings, cancelBooking } from "../redux/slices/bookingSlice";

const MyBookings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { myBookings, loading } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmCancel) return;

    try {
      await dispatch(cancelBooking(bookingId)).unwrap();
      // Refresh bookings after cancellation
      dispatch(fetchMyBookings());
    } catch (error) {
      alert("Failed to cancel booking: " + error);
    }
  };

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
      <h4 className="fw-bold mb-4">My Bookings</h4>

      {myBookings.length === 0 ? (
        <Card className="shadow-sm border-0">
          <Card.Body className="text-center py-5">
            <p className="text-muted">No bookings found</p>
            <Button onClick={() => navigate("/passenger/search")}>
              Book a Flight
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card className="shadow-sm border-0">
          <Card.Body>
            <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>PNR</th>
                  <th>Flight</th>
                  <th>Route</th>
                  <th>Date</th>
                  <th>Seat</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {myBookings.map((booking) => (
                  <tr key={booking.bookingId}>
                    <td className="fw-semibold">{booking.pnr}</td>
                    <td>{booking.flight?.flightNumber}</td>
                    <td>
                      {booking.flight?.route?.sourceAirport?.city} → {booking.flight?.route?.destinationAirport?.city}
                    </td>
                    <td>
                      {booking.flight?.departureTime ? new Date(booking.flight.departureTime).toLocaleDateString() : 'N/A'}
                    </td>
                    <td>{booking.seatNumber || 'N/A'}</td>
                    <td>₹ {booking.totalAmount}</td>
                    <td>
                      <Badge
                        bg={
                          booking.status === "CONFIRMED"
                            ? "success"
                            : booking.status === "CANCELLED"
                            ? "danger"
                            : "secondary"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </td>

                    <td>
                      {/* Cancel Button (Only Confirmed) */}
                      {booking.status === "CONFIRMED" && (
                        <Button
                          size="sm"
                          variant="danger"
                          className="me-2"
                          onClick={() => handleCancel(booking.bookingId)}
                        >
                          Cancel
                        </Button>
                      )}

                      {/* View Ticket */}
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() =>
                          navigate("/passenger/confirmation", {
                            state: {
                              flight: booking.flight,
                              passenger: {
                                name: "Passenger",
                                email: "passenger@email.com",
                              },
                              seat: booking.seatNumber,
                              pnr: booking.pnr,
                            },
                          })
                        }
                      >
                        View Ticket
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

export default MyBookings;
