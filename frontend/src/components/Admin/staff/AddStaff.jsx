import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlice";

const AddStaff = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "STAFF",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email) {
      alert("Name and email are required");
      return;
    }

    try {
      await dispatch(addUser(formData)).unwrap();
      alert("Staff added successfully!");
      navigate("/admin/staff");
    } catch (error) {
      alert("Failed to add staff: " + error);
    }
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <h5 className="fw-bold mb-3">Add Staff</h5>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter staff name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter staff email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" value={formData.role} onChange={handleChange}>
              <option value="STAFF">Staff</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit">Save</Button>
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => navigate("/admin/staff")}
          >
            Cancel
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddStaff;
