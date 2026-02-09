import { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const EditStaff = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const [formData, setFormData] = useState({
    fullName: state?.fullName || "",
    email: state?.email || "",
    phone: state?.phone || "",
    role: state?.role || "STAFF",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Staff updated successfully!");
    navigate("/admin/staff");
  };

  if (!state) {
    return (
      <Alert variant="danger">
        No staff data found. Please go back to staff list.
      </Alert>
    );
  }

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <h5 className="fw-bold mb-3">Edit Staff Member</h5>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={formData.email}
              disabled
            />
            <Form.Text className="text-muted">
              Email cannot be changed
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="STAFF">Staff</option>
              <option value="ADMIN">Admin</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="success" className="me-2">
            Update Staff
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/admin/staff")}
          >
            Cancel
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditStaff;
