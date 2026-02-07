import Carousel from "react-bootstrap/Carousel";
import hero1 from "../../assets/carousel/hero1.png";
import hero2 from "../../assets/carousel/hero2.jpg";
import hero3 from "../../assets/carousel/hero3.jpg";
import { useNavigate } from "react-router-dom";

const HeroCarousel = () => {
  const navigate = useNavigate();
  
  return (
    <section className="container-fluid px-0">
      <Carousel
        fade
        interval={3000}          // auto slide every 4 seconds
        pause="hover"            // pause when mouse is over
        controls={true}
        indicators={true}
      >
        {/* SLIDE 1 */}
        <Carousel.Item>
          <div
            className="d-flex align-items-center text-white"
            style={{
              backgroundImage: `linear-gradient(
                rgba(0,0,0,0.45),
                rgba(0,0,0,0.45)
              ), url(${hero1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "85vh",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1 className="display-5 fw-bold">
                    Fly to Your <br /> Dream Destination
                  </h1>
                  <p className="lead">
                    Fast, Reliable & Affordable Flights <br />
                    Around the World
                  </p>
                  <button className="btn btn-primary btn-lg mt-3" onClick={() => navigate("/login")}>
                    BOOK YOUR FLIGHT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>

        {/* SLIDE 2 */}
        <Carousel.Item>
          <div
            className="d-flex align-items-center text-white"
            style={{
              backgroundImage: `linear-gradient(
                rgba(0,0,0,0.45),
                rgba(0,0,0,0.45)
              ), url(${hero2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "85vh",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1 className="display-5 fw-bold">
                    Explore the World <br /> with Confidence
                  </h1>
                  <p className="lead">
                    Global destinations with flexible schedules
                  </p>
                  <button className="btn btn-primary btn-lg mt-3" onClick={() => navigate("/destinations")}>
                    VIEW DESTINATIONS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>

        {/* SLIDE 3 */}
        <Carousel.Item>
          <div
            className="d-flex align-items-center text-white"
            style={{
              backgroundImage: `linear-gradient(
                rgba(0,0,0,0.45),
                rgba(0,0,0,0.45)
              ), url(${hero3})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "85vh",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1 className="display-5 fw-bold">
                    Travel Made Simple
                  </h1>
                  <p className="lead">
                    24/7 Support · Easy Booking · Secure Payments
                  </p>
                  <button className="btn btn-primary btn-lg mt-3" onClick={() => navigate("/login")}>
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
