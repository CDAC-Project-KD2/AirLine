import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthError } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import loginBg from "../../assets/login.jpg";
import logo from "../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
  if (isAuthenticated) {
    switch (user?.role) {
      case "ADMIN":
        navigate("/admin/dashboard");
        break;
      case "STAFF":
        navigate("/staff/dashboard");
        break;
      case "USER":
        navigate("/passenger/dashboard");
        break;
      default:
        navigate("/");
    }
  }
}, [isAuthenticated, user, navigate]);



  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  return (
    <>
      <Navbar />

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
                  <div className="text-center mb-4">
                    <img src={logo} alt="logo" width="55" className="mb-2" />
                    <h4 className="fw-bold text-primary">FlyMate</h4>
                    <p className="text-muted small">
                      Login to continue your journey
                    </p>
                  </div>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Form.Check label="Remember me" />
                      <span
                        className="text-primary small"
                        role="button"
                        onClick={() => navigate("/forgot-password")}
                      >
                        Forgot password?
                      </span>
                    </div>

                    <Button
                      type="submit"
                      className="w-100 mb-3"
                      variant="primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner size="sm" /> Logging in...
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </Form>

                  <div className="text-center small">
                    Don’t have an account?{" "}
                    <span
                      role="button"
                      className="text-primary fw-semibold"
                      onClick={() => navigate("/register")}
                    >
                      Create one
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default Login;
