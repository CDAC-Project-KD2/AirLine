import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Carousel } from "react-bootstrap";
import home2 from "../../assets/home2.png";
import home3 from "../../assets/home3.png";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import HeroCarousel from "../common/HeroCarousel";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      alert("Please login to book flights");
      navigate("/login");
      return;
    }
    navigate("/passenger/search");
  };

  const features = [
    {
      title: "Fast & Easy Booking",
      desc: "Search & book your flight in just a few clicks.",
      btn: "Book Now",
      action: handleBookNow,
    },
    {
      title: "Any Time Any Where",
      desc: "Fly to destinations across the globe.",
      btn: "View Destinations",
      path: "/destinations",
    },
    {
      title: "24/7 Support",
      desc: "Round-the-clock customer assistance.",
      btn: "Contact Us",
      path: "/contact",
    },
  ];

  // ✅ Passenger Feedbacks
  const feedbacks = [
    { name: "Rahul Sharma", rating: 5, comment: "Excellent service and smooth booking." },
    { name: "Anita Deshmukh", rating: 4, comment: "Staff was polite and helpful." },
    { name: "Suresh Patil", rating: 5, comment: "On-time flight and great experience." },
    { name: "Neha Kulkarni", rating: 4, comment: "Comfortable journey and easy check-in." },
    { name: "Amit Verma", rating: 5, comment: "Best airline experience so far!" },
    { name: "Pooja Mehta", rating: 4, comment: "Good service, will book again." },
  ];

  // Split feedbacks into chunks of 3
  const chunkSize = 3;
  const feedbackChunks = [];
  for (let i = 0; i < feedbacks.length; i += chunkSize) {
    feedbackChunks.push(feedbacks.slice(i, i + chunkSize));
  }

  return (
    <>
      <Navbar />

      <HeroCarousel />

      {/* FEATURE BOXES */}
      <section className="container my-5">
        <div className="row g-4 text-center">
          {features.map((item, i) => (
            <div className="col-md-4" key={i}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="fw-bold">{item.title}</h5>
                  <p className="text-muted">{item.desc}</p>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => item.action ? item.action() : navigate(item.path)}
                  >
                    {item.btn}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h6 className="text-primary fw-bold">Welcome to B AIRWAYS</h6>
            <h2 className="fw-bold">Your Premier Airline Experience</h2>
            <p className="text-muted">
              Search fast and affordable flights to a wide range of destinations.
            </p>

            <ul className="list-unstyled">
              <li>✔ Affordable & Quick</li>
              <li>✔ Global Network</li>
            </ul>

            <button
              className="btn btn-outline-primary me-2"
              onClick={() => navigate("/destinations")}
            >
              VIEW DESTINATIONS
            </button>

            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/contact")}
            >
              CONTACT US
            </button>
          </div>

          <div className="col-md-6 mt-4 mt-md-0">
            <img src={home2} className="img-fluid rounded shadow" alt="plane" />
          </div>
        </div>
      </section>

      {/* WHY FLY */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Why Fly With Us?</h2>

          <div className="row align-items-center">
            <div className="col-md-6">
              <ul className="list-unstyled fs-5">
                <li>✔ Fast & Easy Booking</li>
                <li>✔ Flexible Schedules</li>
                <li>✔ Exceptional Support</li>
                <li>✔ Recent Awards</li>
              </ul>

              <button
                className="btn btn-primary btn-lg"
                onClick={handleBookNow}
              >
                BOOK NOW
              </button>
            </div>

            <div className="col-md-6 mt-4 mt-md-0">
              <img src={home3} className="img-fluid rounded shadow" alt="crew" />
            </div>
          </div>
        </div>
      </section>

      {/* PASSENGER FEEDBACK CAROUSEL */}
      <section className="container my-5">
        <h2 className="text-center fw-bold mb-4">
          What Our Passengers Say
        </h2>

        <Carousel pause="hover" indicators={false} controls>
          {feedbackChunks.map((group, idx) => (
            <Carousel.Item key={idx}>
              <div className="row g-4">
                {group.map((fb, i) => (
                  <div className="col-md-4" key={i}>
                    <div className="card shadow-sm border-0 h-100">
                      <div className="card-body text-center">
                        <h6 className="fw-bold">{fb.name}</h6>

                        {/* Stars */}
                        <div className="mb-2">
                          {[...Array(fb.rating)].map((_, i) => (
                            <span key={i} className="text-warning fs-5">★</span>
                          ))}
                          {[...Array(5 - fb.rating)].map((_, i) => (
                            <span key={i} className="text-secondary fs-5">★</span>
                          ))}
                        </div>

                        <p className="text-muted fst-italic">
                          “{fb.comment}”
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      <Footer />
    </>
  );
};

export default Home;
