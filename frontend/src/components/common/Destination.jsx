import { Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";


// You can replace these image URLs with local assets
const destinations = [
  {
    city: "Mumbai",
    image:
      "https://i0.wp.com/reporterontheroad.com/wp-content/uploads/Mumbai_Cover.jpg?fit=770%2C548&ssl=1",
  },
  {
    city: "Delhi",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5",
  },
  {
    city: "Goa",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    city: "Bengaluru",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2",
  },
  {
    city: "Jaipur",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada",
  },
  {
    city: "Chennai",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Chennai_Central.jpg/330px-Chennai_Central.jpg",
  },
];

const Destinations = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleExploreFlights = (destination) => {
    if (!isAuthenticated) {
      alert("Please login to search flights");
      navigate("/login");
      return;
    }
    
    navigate("/passenger/search-flights", {
      state: { destination },
    });
  };

  return (
    <>
    <Navbar/>
      {/* PAGE TITLE */}
      <h4 className="fw-bold mb-4 text-center">
        Explore Our Destinations
      </h4>

      <Row className="g-4">
        {destinations.map((dest, index) => (
          <Col md={4} sm={6} key={index}>
            <Card className="shadow-sm border-0 h-100">
              <div
                style={{
                  height: "200px",
                  backgroundImage: `url(${dest.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <Card.Body className="text-center">
                <h5 className="fw-bold">{dest.city}</h5>
                <p className="text-muted">
                  Discover flights to {dest.city}
                </p>

                <Button
                  size="sm"
                  onClick={() => handleExploreFlights(dest.city)}
                >
                  Explore Flights
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Footer/>
    </>
  );
};

export default Destinations;
