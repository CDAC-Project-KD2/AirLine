import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearAuthError } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

import loginBg from "../../assets/login.jpg";
import logo from "../../assets/logo.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your registered email");
      return;
    }

    dispatch(forgotPassword({ email }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  return (
    <div
      className="d-flex align-items-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(
          rgba(0,0,0,0.55),
          rgba(0,0,0,0.55)
        ), url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={5} lg={4}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-4">
                {/* HEADER */}
                <div className="text-center mb-4">
                  <img
                    src={logo}
                    alt="logo"
                    width="55"
                    className="mb-2"
                  />
                  <h4 className="fw-bold text-primary mb-0">
                    FlyMate
                  </h4>
                  <p className="text-muted small">
                    Forgot Password
                  </p>
                </div>

                {/* FORM */}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" /> Sending...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </Form>

                {/* FOOTER LINKS */}
                <div className="text-center small">
                  Remember your password?{" "}
                  <span
                    role="button"
                    className="text-primary fw-semibold"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;
