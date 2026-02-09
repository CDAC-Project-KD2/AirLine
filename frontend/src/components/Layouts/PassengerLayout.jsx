import { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Button } from "react-bootstrap";
import logo from "../../assets/logo.png";
import bgImage from "../../assets/bg.png";

const PassengerLayout = () => {
  const navigate = useNavigate();

  // 🔐 FRONTEND VALIDATION
//   useEffect(() => {
//     const role = localStorage.getItem("role");

//     if (role !== "PASSENGER") {
//       navigate("/login");
//     }
//   }, [navigate]);

  return (
    <>
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      
      {/* SIDEBAR */}
       <aside
                className="text-white p-3"
                style={{ width: "260px", backgroundColor: "#082466" }}
            >
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="logo"
            width="45"
          />
          <h6 className="mt-2 mb-0">FlyMate</h6>
          <small className="text-secondary">Passenger Panel</small>
        </div>

        <nav className="nav flex-column gap-2">
          <NavLink to="/passenger/dashboard" end className="nav-link text-white">
            Dashboard
          </NavLink>
          <NavLink to="/passenger/search-flights" className="nav-link text-white">
            Search Flights
          </NavLink>
          <NavLink to="/passenger/bookings" className="nav-link text-white">
            My Bookings
          </NavLink>
          <NavLink to="/passenger/transactions" className="nav-link text-white">
            Transactions
          </NavLink>
          <NavLink to="/passenger/profile" className="nav-link text-white">
            Profile
          </NavLink>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div
                          className="flex-grow-1 bg-dark"
                          style={{
                              backgroundImage: `url(${bgImage})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                          }}
                      >
        
        {/* TOP BAR */}
        <Navbar bg="white" className="shadow-sm px-4">
          <Navbar.Brand className="fw-bold">
            Passenger Dashboard
          </Navbar.Brand>

          <div className="ms-auto">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                localStorage.clear();
                navigate("/logout");
              }}
            >
              Logout
            </Button>
          </div>
        </Navbar>

        {/* PAGE CONTENT */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
    </>
  );
};

export default PassengerLayout;
