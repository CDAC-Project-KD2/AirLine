import { useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

import loginBg from "../../assets/login.jpg";
import logo from "../../assets/logo.png";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // 🔹 Clear auth state via Redux
    dispatch(logoutUser());
    toast.success("Logged out successfully");

    // 🔹 Redirect after short delay
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
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
            <Card className="text-center shadow-lg border-0">
              <Card.Body className="p-4">
                <img
                  src={logo}
                  alt="logo"
                  width="55"
                  className="mb-3"
                />

                <h5 className="fw-bold text-primary mb-2">
                  Logging you out...
                </h5>

                <p className="text-muted small mb-3">
                  Thank you for choosing FlyMate
                </p>

                <Spinner animation="border" variant="primary" />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Logout;
