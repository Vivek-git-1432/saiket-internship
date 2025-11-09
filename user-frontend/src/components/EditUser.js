import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { Form, Button, Card, Container, Spinner } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = "/api/users";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await api.get(`${API_URL}/${id}`);

        // Handle different response formats
        let userData = null;
        
        if (Array.isArray(res.data)) {
          // Array response - take first element
          userData = res.data[0];
        } else if (res.data && res.data.user) {
          // Response with user property
          userData = res.data.user;
        } else if (res.data && res.data.data) {
          // Response with data property
          userData = res.data.data;
        } else if (res.data && typeof res.data === 'object') {
          // Direct object response
          userData = res.data;
        }

        if (userData && (userData.id || userData._id)) {
          setForm({
            name: userData.name || "",
            email: userData.email || "",
            age: userData.age || "",
          });
          console.log("✅ User data loaded:", userData);
        } else {
          console.error("⚠️ User not found or invalid format:", res.data);
          toast.error("⚠️ User not found!");
          navigate("/");
        }
      } catch (err) {
        console.error("❌ Error fetching user:", err);
        toast.error("Failed to load user details. Please check your backend connection.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.put(`${API_URL}/${id}`, form);
      toast.success("✅ User details updated successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("❌ Error updating user:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Update failed! Please check your backend connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="fade-in text-center py-5">
        <Spinner animation="border" variant="warning" size="lg" className="mb-3" />
        <p className="text-white">Loading user details...</p>
      </Container>
    );
  }

  return (
    <Container className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-white fw-bold mb-2">
            <span className="me-2">✏️</span>Edit User
          </h2>
          <p className="text-white-50 mb-0">Update user information</p>
        </div>
        <Link to="/" className="btn btn-outline-light">
          <span className="me-2">←</span>Back to List
        </Link>
      </div>

      <Card className="form-card-modern shadow-lg">
        <Card.Body className="p-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4 form-group-modern">
              <Form.Label className="form-label-modern">
                <span className="label-icon">👤</span> Full Name
              </Form.Label>
              <Form.Control
                name="name"
                placeholder="Enter full name (e.g., John Doe)"
                value={form.name}
                onChange={handleChange}
                className="form-control-modern"
                required
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-4 form-group-modern">
              <Form.Label className="form-label-modern">
                <span className="label-icon">📧</span> Email Address
              </Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email address (e.g., john@example.com)"
                value={form.email}
                onChange={handleChange}
                className="form-control-modern"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4 form-group-modern">
              <Form.Label className="form-label-modern">
                <span className="label-icon">🎂</span> Age
              </Form.Label>
              <Form.Control
                name="age"
                type="number"
                min="1"
                max="120"
                placeholder="Enter age (e.g., 25)"
                value={form.age}
                onChange={handleChange}
                className="form-control-modern"
                required
              />
            </Form.Group>

            <div className="d-flex gap-3 mt-4">
              <Button
                type="submit"
                variant="warning"
                size="lg"
                className="flex-fill submit-button-modern"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <span className="me-2">💾</span>Save Changes
                  </>
                )}
              </Button>
              <Link to="/" className="btn btn-outline-secondary btn-lg">
                Cancel
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
