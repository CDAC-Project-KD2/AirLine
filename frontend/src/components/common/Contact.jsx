import { Card, Row, Col, Form, Button } from "react-bootstrap";
import loginBg from "../../assets/login.jpg";
import Navbar from "./Navbar";
import Footer from "./Footer";


const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully (demo)");
    
  };

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
          Contact Us
        </h3>

        <Row className="justify-content-center g-4">
          {/* CONTACT INFO */}
          <Col md={4}>
            <Card className="shadow-lg border-0 h-100">
              <Card.Body>
                <h6 className="fw-bold mb-3">Get in Touch</h6>
                <p className="text-muted mb-2">
                  📍 Flymate Airlines Pvt. Ltd.<br />
                  Mumbai, India
                </p>
                <p className="text-muted mb-2">📞 +91 98765 43210</p>
                <p className="text-muted mb-2">✉️ support@flymate.com</p>
                <p className="text-muted">
                  We are available 24/7 to help you.
                </p>
              </Card.Body>
            </Card>
          </Col>

          {/* CONTACT FORM */}
          <Col md={6}>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <h6 className="fw-bold mb-3">Send a Message</h6>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={4} required />
                  </Form.Group>

                  <Button type="submit">Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Contact;
