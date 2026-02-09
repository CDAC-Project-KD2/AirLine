import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* TOP STRIP */}
      <div className="container-fluid bg-primary text-white py-1 small">
        <div className="container d-flex justify-content-end gap-3">
          <span role="button" onClick={() => navigate("/login")}>
            Log In
          </span>
          <span role="button" onClick={() => navigate("/register")}>
            Create an Account
          </span>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <div className="container d-flex align-items-center">
            <a
              className="navbar-brand fw-bold text-primary d-flex align-items-center gap-2"
              href="#"
            >
              <img
                src={logo}
                alt="logo"
                width="35"
              />
              FlyMate
            </a>

            <button
              className="navbar-toggler ms-auto"
              data-bs-toggle="collapse"
              data-bs-target="#nav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="nav">
              <ul className="navbar-nav align-items-lg-center">
                <li className="nav-item"><a className="nav-link" href="#" onClick={() => navigate("/")}>Home</a></li>
                <li className="nav-item"><a className="nav-link" href="#" onClick={() => navigate("/about")}>About</a></li>
                <li className="nav-item"><a className="nav-link" href="#" onClick={() => navigate("/contact")}>Contact</a></li>
                <li className="nav-item ms-lg-3">
                  <button className="btn btn-primary px-4" onClick={() => navigate("/login")}>
                    BOOK NOW
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
