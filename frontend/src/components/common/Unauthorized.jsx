import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Unauthorized = () => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const handleGoHome = () => {
    if (isAuthenticated && user) {
      switch (user.role) {
        case "ADMIN":
          navigate("/admin/dashboard");
          break;
        case "STAFF":
          navigate("/staff/dashboard");
          break;
        case "PASSENGER":
          navigate("/passenger/dashboard");
          break;
        default:
          navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <Card
        className="shadow-lg border-0 text-center p-4"
        style={{ maxWidth: "420px" }}
      >
        <Card.Body>
          <div className="mb-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
              alt="access denied"
              width="70"
            />
          </div>

          <h4 className="fw-bold text-danger mb-2">
            Access Denied
          </h4>

          <p className="text-muted mb-4">
            {isAuthenticated
              ? "You are logged in, but your role does not have permission to access this page."
              : "You do not have permission to access this page. Please login with an authorized account."}
          </p>

          <div className="d-grid gap-2">
            {!isAuthenticated && (
              <Button
                variant="primary"
                onClick={() => navigate("/login")}
              >
                Go to Login
              </Button>
            )}

            <Button
              variant="secondary"
              onClick={handleGoHome}
            >
              Go to Home
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Unauthorized;
