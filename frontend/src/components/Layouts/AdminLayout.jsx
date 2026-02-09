import { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Button } from "react-bootstrap";
import logo from "../../assets/logo.png";
import bgImage from "../../assets/bg.png";

const AdminLayout = () => {
    const navigate = useNavigate();

    // 🔐 FRONTEND VALIDATION (NO BACKEND)
    //   useEffect(() => {
    //     const role = localStorage.getItem("role");

    //     if (role !== "ADMIN") {
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
                    <h5 className="mt-2 mb-0">FlyMate</h5>
                    <small className="text-secondary">Admin Panel</small>
                </div>

                <nav className="nav flex-column gap-2">
                    <NavLink to="/admin/dashboard" end className="nav-link text-white">
                        Dashboard
                    </NavLink>
                    <NavLink to="/admin/staff" className="nav-link text-white">
                        Manage Staff
                    </NavLink>
                    <NavLink to="/admin/flights" className="nav-link text-white">
                        Manage Flights
                    </NavLink>
                    <NavLink to="/admin/routes" className="nav-link text-white">
                        Manage Routes
                    </NavLink>
                    <NavLink to="/admin/bookings" className="nav-link text-white">
                        Manage Bookings
                    </NavLink>
                    <NavLink to="/admin/reports" className="nav-link text-white">
                        Reports
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
                        FlyMate
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

export default AdminLayout;
