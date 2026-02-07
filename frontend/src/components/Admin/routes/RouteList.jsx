import { Table, Button, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoutes, deleteRoute } from "../../redux/slices/routeSlice";

const RouteList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { routes, loading } = useSelector((state) => state.routes);

  useEffect(() => {
    dispatch(fetchRoutes());
  }, [dispatch]);

  const handleDelete = async (routeId, routeName) => {
    if (window.confirm(`Are you sure you want to delete route ${routeName}?`)) {
      try {
        await dispatch(deleteRoute(routeId)).unwrap();
        alert("Route deleted successfully!");
      } catch (error) {
        alert("Failed to delete route: " + error);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-2">Loading routes...</p>
      </div>
    );
  }

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Manage Routes</h5>
          <Button onClick={() => navigate("/admin/routes/add")}>
            + Add Route
          </Button>
        </div>

        {routes.length === 0 ? (
          <p className="text-muted text-center py-4">No routes found</p>
        ) : (
          <Table bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Distance</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route, index) => (
                <tr key={route.routeId}>
                  <td>{index + 1}</td>
                  <td>{route.sourceAirport?.city}</td>
                  <td>{route.destinationAirport?.city}</td>
                  <td>{route.distanceKm} km</td>
                  <td>{Math.floor(route.durationMinutes / 60)}h {route.durationMinutes % 60}m</td>
                  <td>
                    <Button 
                      size="sm" 
                      variant="warning" 
                      className="me-2"
                      onClick={() =>
                        navigate(`/admin/routes/edit/${route.routeId}`, {
                          state: route,
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="danger"
                      onClick={() => handleDelete(route.routeId, `${route.sourceAirport?.city} → ${route.destinationAirport?.city}`)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default RouteList;
