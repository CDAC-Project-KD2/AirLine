import { Card, Row, Col } from "react-bootstrap";
import loginBg from "../../assets/login.jpg";
import Footer from "./Footer";
import Navbar from "./Navbar";

const About = () => {
  return (
    <>
    <Navbar />
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          minHeight: "100vh",
          padding: "40px",
        }}
      >
        <h3 className="fw-bold text-white mb-4 text-center">
          About Flymate
        </h3>

        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="shadow-lg border-0 mb-4">
              <Card.Body>
                <p className="text-muted">
                  <strong>Flymate</strong> is a modern airline reservation
                  platform designed to deliver a smooth, fast, and secure
                  booking experience. From flight search to booking
                  management, Flymate simplifies air travel.
                </p>
              </Card.Body>
            </Card>

            <Row className="g-4">
              <Col md={6}>
                <Card className="shadow-sm border-0 h-100">
                  <Card.Body>
                    <h6 className="fw-bold">Our Mission</h6>
                    <p className="text-muted">
                      To make air travel accessible, affordable, and
                      convenient through digital innovation.
                    </p>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="shadow-sm border-0 h-100">
                  <Card.Body>
                    <h6 className="fw-bold">Why Choose Flymate?</h6>
                    <ul className="text-muted mb-0">
                      <li>Easy flight search & booking</li>
                      <li>Secure payment flow</li>
                      <li>User-friendly dashboards</li>
                      <li>24/7 customer support</li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default About;
