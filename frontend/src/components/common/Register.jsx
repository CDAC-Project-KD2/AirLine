import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { registerUser, clearAuthError } from "../redux/slices/authSlice";

import loginBg from "../../assets/login.jpg";
import logo from "../../assets/logo.png";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword } = form;

    if (!name || !email || !phone || !password || !confirmPassword) {
      setLocalError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    setLocalError("");

    dispatch(
      registerUser({
        fullName: name,
        email,
        phone,
        password,
        role: "USER",
      })
    );
  };

  // Handle success
  useEffect(() => {
    if (success) {
      toast.success("Registration successful! Please login.");
      navigate("/login");
    }
  }, [success, navigate]);

  // Handle error
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
            <Col md={6} lg={5}>
              <Card className="shadow-lg border-0">
                <Card.Body className="p-4">
                  {/* HEADER */}
                  <div className="text-center mb-4">
                    <img src={logo} alt="logo" width="55" className="mb-2" />
                    <h4 className="fw-bold text-primary mb-0">FlyMate</h4>
                    <p className="text-muted small">
                      Passenger Registration
                    </p>
                  </div>

                  {/* ERRORS */}
                  {(localError || error) && (
                    <div className="alert alert-danger py-2 small">
                      {localError || error}
                    </div>
                  )}

                  {/* FORM */}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100 mb-3"
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner size="sm" animation="border" />
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </Form>

                  {/* FOOTER */}
                  <div className="text-center small">
                    Already have an account?{" "}
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

      <Footer />
    </>
  );
};

export default Register;
