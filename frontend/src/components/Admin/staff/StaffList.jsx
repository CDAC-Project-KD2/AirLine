import { Table, Button, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUser } from "../../redux/slices/userSlice";

const StaffList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allUsers, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Show all users for now (remove filter to see if any users exist)
  const staffList = allUsers && allUsers.length > 0 ? 
    allUsers.filter(user => user.role === 'STAFF') : 
    [{ userId: 2, fullName: "Staff User", email: "staff@airline.com", role: "STAFF", status: "ACTIVE" }];

  const handleDelete = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      try {
        await dispatch(deleteUser(userId)).unwrap();
        alert("Staff member deleted successfully!");
      } catch (error) {
        alert("Failed to delete staff member: " + error);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-2">Loading staff...</p>
      </div>
    );
  }

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Manage Staff</h5>
          <Button onClick={() => navigate("/admin/staff/add")}>
            + Add Staff
          </Button>
        </div>

        {staffList.length === 0 ? (
          <p className="text-muted text-center py-4">No staff members found</p>
        ) : (
          <Table bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff, index) => (
                <tr key={staff.userId}>
                  <td>{index + 1}</td>
                  <td>{staff.fullName}</td>
                  <td>{staff.email}</td>
                  <td>{staff.role}</td>
                  <td>
                    <span className={`badge ${staff.status === 'ACTIVE' ? 'bg-success' : 'bg-danger'}`}>
                      {staff.status}
                    </span>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="warning"
                      className="me-2"
                      onClick={() =>
                        navigate(`/admin/staff/edit/${staff.userId}`, {
                          state: staff,
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="danger"
                      onClick={() => handleDelete(staff.userId, staff.fullName)}
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

export default StaffList;
