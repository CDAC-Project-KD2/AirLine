import { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights } from "../redux/slices/flightSlice";

const SearchFlights = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { flights, loading } = useSelector((state) => state.flights);

  const [search, setSearch] = useState({
    source: "",
    destination: "",
    date: "",
  });

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search.source || !search.destination || !search.date) {
      alert("Please select source, destination, and date");
      return;
    }

    // For now, just get all flights instead of searching
    await dispatch(fetchFlights());
    
    // Navigate to Available Flights page
    navigate("/passenger/available-flights", {
      state: {
        searchParams: search,
        travelDate: search.date,
      },
    });
  };

  return (
    <>
      {/* PAGE TITLE */}
      <h4 className="fw-bold mb-4">Search Flights</h4>

      {/* SEARCH FORM */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row className="g-3 align-items-end">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Source</Form.Label>
                  <Form.Select
                    name="source"
                    value={search.source}
                    onChange={handleChange}
                  >
                    <option value="">Select Source</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Destination</Form.Label>
                  <Form.Select
                    name="destination"
                    value={search.destination}
                    onChange={handleChange}
                  >
                    <option value="">Select Destination</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group>
                  <Form.Label>Travel Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={search.date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={1} className="d-grid">
                <Button type="submit" disabled={loading}>
                  {loading ? "Searching..." : "Search"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default SearchFlights;
