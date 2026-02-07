import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer
      className="container-fluid text-white"
      style={{
        background: "linear-gradient(90deg, #082466, #2a4878)",
      }}
    >
      <div className="container py-4">
        <div className="row align-items-start">

          {/* COMPANY */}
          <div className="col-md-3 col-6 mb-3">
            <h6 className="fw-bold mb-3">Company</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">› About</li>
              <li className="mb-2">› Booking</li>
              <li>› Contact</li>
            </ul>
          </div>

          {/* LEGAL */}
          <div className="col-md-3 col-6 mb-3">
            <h6 className="fw-bold mb-3">Legal</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">› Privacy Policy</li>
              <li>› Terms & Conditions</li>
            </ul>
          </div>

          {/* ABOUT US */}
          <div className="col-md-3 mb-3">
            <h6 className="fw-bold mb-3">About Us</h6>
            <p className="small mb-0 text-light opacity-75">
              FlyMate is a subsidiary of Virgin Airlines.
              Seamless air travel across the globe with comfort and trust.
            </p>
          </div>

          {/* LOGO */}
          <div className="col-md-3 text-md-end text-center">
            <img
              src={logo}
              alt=" FlyMate"
              width="70"
              className="mb-2"
            />
            <h6 className="fw-bold mb-0">FlyMate</h6>
            <small className="text-light opacity-75">
              Your Trusted Airline Partner
            </small>
          </div>
        </div>

        {/* COPYRIGHT */}
        <hr className="border-secondary my-3" />
        <p className="text-center small mb-0 opacity-75">
          Copyright © {new Date().getFullYear()} FlyMate. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
