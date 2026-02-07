import { useEffect, useState } from "react";
import { Card, Spinner, Button, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBooking, fetchMyBookings } from "../redux/slices/bookingSlice";

const PaymentStatus = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  // Validate required data
  const isValidPayment =
    state &&
    state.flight &&
    state.passenger &&
    state.seat;

  const [status, setStatus] = useState("loading"); // loading | success | failed
  const [pnr, setPnr] = useState("");

  useEffect(() => {
    if (!isValidPayment) {
      setStatus("failed");
      return;
    }

    // Create booking after payment simulation
    const timer = setTimeout(async () => {
      try {
        const bookingData = {
          flightId: state.flight.flightId || state.flight.id || 1,
          seatNumber: state.seat,
          paymentMethod: state.paymentMethod || "Credit Card",
          totalAmount: parseFloat(state.flight.basePrice || state.flight.price || 5500),
          numberOfPassengers: 1,
          seatClass: "ECONOMY"
        };
        
        console.log('Creating booking with data:', bookingData);
        console.log('Payment method selected:', state.paymentMethod);
        const result = await dispatch(createBooking(bookingData)).unwrap();
        console.log('Booking created successfully:', result);
        
        if (result && result.pnr) {
          setPnr(result.pnr);
          setStatus("success");
        } else {
          console.error('Invalid booking result:', result);
          setStatus("failed");
        }
      } catch (error) {
        console.error('Booking failed:', error);
        console.error('Error details:', error.message);
        
        // Show specific error message if available
        if (error.message && error.message.includes('already booked')) {
          alert('The selected seat was just booked by another user. Please go back and select a different seat.');
        }
        
        setStatus("failed");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isValidPayment, dispatch, state]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card
        className="shadow-lg border-0 text-center p-4"
        style={{ width: "420px" }}
      >
        {/* LOADING */}
        {status === "loading" && (
          <>
            <Spinner animation="border" className="mb-3" />
            <h5 className="fw-bold">Processing Payment</h5>
            <p className="text-muted">
              Please do not refresh or close this page
            </p>
          </>
        )}

        {/* SUCCESS */}
        {status === "success" && (
          <>
            <h4 className="fw-bold text-success mb-2">
              Payment Successful 🎉
            </h4>
            <p className="text-muted mb-3">
              Your payment has been processed successfully.
            </p>

            <Alert variant="success" className="small">
              Seat <strong>{state.seat}</strong> has been successfully
              booked. PNR: <strong>{pnr}</strong>
            </Alert>

            <Button
              className="w-100"
              onClick={() => {
                // Refresh bookings in Redux store
                dispatch(fetchMyBookings());
                navigate("/passenger/confirmation", {
                  state: {
                    flight: state.flight,
                    passenger: state.passenger,
                    seat: state.seat,
                    pnr: pnr,
                  },
                });
              }}
            >
              View Booking Confirmation
            </Button>
          </>
        )}

        {/* FAILED */}
        {status === "failed" && (
          <>
            <h4 className="fw-bold text-danger mb-2">
              Payment Failed ❌
            </h4>
            <p className="text-muted mb-3">
              Something went wrong while processing your payment.
            </p>

            {!isValidPayment && (
              <Alert variant="danger" className="small">
                Invalid or expired payment session.
              </Alert>
            )}

            <div className="d-grid gap-2">
              <Button
                variant="danger"
                onClick={() => navigate(-1)}
              >
                Retry Payment
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate("/passenger")}
              >
                Go to Dashboard
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default PaymentStatus;
