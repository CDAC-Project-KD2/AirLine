import { Card, Table, Button, Badge, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBookings, cancelBooking } from "../../redux/slices/bookingSlice";

const BookingList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allBookings, loading } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  const handleCancel = async (bookingId, pnr) => {
    if (window.confirm(`Are you sure you want to cancel booking ${pnr}?`)) {
      try {
        await dispatch(cancelBooking(bookingId)).unwrap();
        alert("Booking cancelled successfully!");
      } catch (error) {
        alert("Failed to cancel booking: " + error);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-2">Loading bookings...</p>
      </div>
    );
  }

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <h5 className="fw-bold mb-3">Manage Bookings</h5>

        {allBookings.length === 0 ? (
          <p className="text-muted text-center py-4">No bookings found</p>
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
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {allBookings.map((booking, index) => (
                <tr key={booking.bookingId}>
                  <td>{index + 1}</td>
                  <td>{booking.pnr}</td>
                  <td>{booking.passenger?.fullName || 'N/A'}</td>
                  <td>{booking.flight?.flightNumber}</td>
                  <td>
                    {booking.flight?.route?.sourceAirport?.city} → {booking.flight?.route?.destinationAirport?.city}
                  </td>
                  <td>
                    {booking.flight?.departureTime ? new Date(booking.flight.departureTime).toLocaleDateString() : 'N/A'}
                  </td>
                  <td>₹ {booking.totalAmount}</td>
                  <td>
                    <Badge bg={booking.status === "CONFIRMED" ? "success" : booking.status === "CANCELLED" ? "danger" : "secondary"}>
                      {booking.status}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="primary"
                      className="me-2"
                      onClick={() =>
                        navigate(`/admin/bookings/${booking.pnr}`, { state: booking })
                      }
                    >
                      View Details
                    </Button>
                    {booking.status === "CONFIRMED" && (
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleCancel(booking.bookingId, booking.pnr)}
                      >
                        Cancel
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookingList;
