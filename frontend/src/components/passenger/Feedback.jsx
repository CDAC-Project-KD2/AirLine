import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Feedback = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    setError("");
    setSubmitted(true);

    // FRONTEND ONLY (Later connect API)
    console.log("Feedback Submitted:", {
      pnr: state?.pnr,
      flightNo: state?.flightNo,
      route: state?.route,
      rating,
      comment,
    });

    setTimeout(() => {
      navigate("/passenger/bookings");
    }, 2000);
  };

  return (
    <>
      <h4 className="fw-bold mb-4">Flight Feedback</h4>

      <Card className="shadow-sm border-0">
        <Card.Body>
          {submitted && (
            <Alert variant="success">
              Thank you! Your feedback has been submitted.
            </Alert>
          )}

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Flight Details */}
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>PNR</Form.Label>
                <Form.Control value={state?.pnr || ""} disabled />
              </Col>
              <Col md={4}>
                <Form.Label>Flight No</Form.Label>
                <Form.Control value={state?.flightNo || ""} disabled />
              </Col>
              <Col md={4}>
                <Form.Label>Route</Form.Label>
                <Form.Control value={state?.route || ""} disabled />
              </Col>
            </Row>

            {/* Rating */}
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant={star <= rating ? "warning" : "outline-secondary"}
                    className="me-1"
                    onClick={() => setRating(star)}
                  >
                    ★
                  </Button>
                ))}
              </div>
            </Form.Group>

            {/* Comment */}
            <Form.Group className="mb-3">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>

            {/* Actions */}
            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>

              <Button variant="success" type="submit">
                Submit Feedback
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Feedback;
