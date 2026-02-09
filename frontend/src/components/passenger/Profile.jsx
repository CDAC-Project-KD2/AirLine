import { useState, useEffect } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: ""
  });
  
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    phone: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/profile');
      setProfile(response.data);
      setProfileForm({
        fullName: response.data.fullName,
        phone: response.data.phone,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axios.put('http://localhost:8080/api/users/profile', profileForm);
      setProfile(response.data);
      alert("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert("Failed to update profile");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      await axios.put('http://localhost:8080/api/users/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      alert("Password updated successfully!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error('Error changing password:', error);
      alert("Failed to change password");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <p className="mt-2">Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      {/* PAGE TITLE */}
      <h4 className="fw-bold mb-4">My Profile</h4>

      <Row className="g-4">
        {/* PROFILE DETAILS */}
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="fw-bold mb-3">Profile Details</h6>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    name="fullName"
                    value={profileForm.fullName}
                    onChange={handleProfileChange}
                    disabled={!editMode}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={profile.email}
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
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                    disabled={!editMode}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    value={profile.role}
                    disabled
                  />
                </Form.Group>

                {!editMode ? (
                  <Button onClick={() => setEditMode(true)}>
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="success" 
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="secondary"
                      className="ms-2"
                      onClick={() => {
                        setEditMode(false);
                        setProfileForm({
                          fullName: profile.fullName,
                          phone: profile.phone,
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* CHANGE PASSWORD */}
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="fw-bold mb-3">Change Password</h6>

              <Form onSubmit={handleChangePassword}>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength={6}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </Form.Group>

                <Button 
                  variant="warning" 
                  type="submit"
                >
                  Update Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
