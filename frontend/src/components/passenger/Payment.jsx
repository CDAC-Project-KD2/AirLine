import { useState } from "react";
import { Card, Row, Col, Form, Button, Badge, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { flight, passenger, seat } = state || {};

  const [paymentMode, setPaymentMode] = useState("card");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    upi: "",
    bank: "",
  });

  if (!flight || !passenger || !seat) {
    return <p>Invalid payment session.</p>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let temp = {};

    if (paymentMode === "card") {
      if (!/^\d{16}$/.test(form.cardNumber))
        temp.cardNumber = "Card number must be 16 digits";

      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry))
        temp.expiry = "Expiry must be in MM/YY format";

      if (!/^\d{3}$/.test(form.cvv))
        temp.cvv = "CVV must be 3 digits";
    }

    if (paymentMode === "upi") {
      if (!/^[\w.-]+@[\w.-]+$/.test(form.upi))
        temp.upi = "Enter a valid UPI ID";
    }

    if (paymentMode === "netbanking") {
      if (!form.bank) temp.bank = "Please select a bank";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Simulate payment success
    navigate("/passenger/payment-status", {
      state: {
        flight,
        passenger,
        seat,
        paymentMethod: paymentMode === "card" ? "Credit/Debit Card" : 
                      paymentMode === "upi" ? "UPI" : "Net Banking",
      },
    });
  };

  return (
    <>
      <h4 className="fw-bold mb-4">Payment</h4>

      <Row className="g-4">
        {/* PAYMENT FORM */}
        <Col md={7}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="fw-bold mb-3">Choose Payment Method</h6>

              <Form onSubmit={handlePayment}>
                <Form.Check
                  type="radio"
                  label="Credit / Debit Card"
                  name="mode"
                  checked={paymentMode === "card"}
                  onChange={() => setPaymentMode("card")}
                  className="mb-2"
                />

                <Form.Check
                  type="radio"
                  label="UPI"
                  name="mode"
                  checked={paymentMode === "upi"}
                  onChange={() => setPaymentMode("upi")}
                  className="mb-2"
                />

                <Form.Check
                  type="radio"
                  label="Net Banking"
                  name="mode"
                  checked={paymentMode === "netbanking"}
                  onChange={() => setPaymentMode("netbanking")}
                  className="mb-4"
                />

                {/* CARD PAYMENT */}
                {paymentMode === "card" && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control
                        name="cardNumber"
                        maxLength={16}
                        value={form.cardNumber}
                        onChange={handleChange}
                        isInvalid={!!errors.cardNumber}
                        placeholder="1234567812345678"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.cardNumber}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Expiry (MM/YY)</Form.Label>
                          <Form.Control
                            name="expiry"
                            value={form.expiry}
                            onChange={handleChange}
                            isInvalid={!!errors.expiry}
                            placeholder="08/27"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.expiry}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>CVV</Form.Label>
                          <Form.Control
                            type="password"
                            name="cvv"
                            maxLength={3}
                            value={form.cvv}
                            onChange={handleChange}
                            isInvalid={!!errors.cvv}
                            placeholder="123"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.cvv}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}

                {/* UPI */}
                {paymentMode === "upi" && (
                  <Form.Group className="mb-3">
                    <Form.Label>UPI ID</Form.Label>
                    <Form.Control
                      name="upi"
                      value={form.upi}
                      onChange={handleChange}
                      isInvalid={!!errors.upi}
                      placeholder="name@upi"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.upi}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                {/* NET BANKING */}
                {paymentMode === "netbanking" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Select Bank</Form.Label>
                    <Form.Select
                      name="bank"
                      value={form.bank}
                      onChange={handleChange}
                      isInvalid={!!errors.bank}
                    >
                      <option value="">Select Bank</option>
                      <option>SBI</option>
                      <option>HDFC</option>
                      <option>ICICI</option>
                      <option>Axis Bank</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.bank}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                <Button type="submit" className="mt-2">
                  Pay Now
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* ORDER SUMMARY */}
        <Col md={5}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="fw-bold mb-3">Order Summary</h6>
              <p><strong>Flight:</strong> {flight.flightNo}</p>
              <p><strong>Passenger:</strong> {passenger.name}</p>
              <p>
                <strong>Seat:</strong>{" "}
                <Badge bg="primary">{seat}</Badge>
              </p>
              <p><strong>Departure:</strong> {flight.time}</p>
              <hr />
              <h5 className="fw-bold">
                Total Amount: ₹ {flight.price}
              </h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Payment;
