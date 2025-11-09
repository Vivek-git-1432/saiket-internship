import React, { useState } from "react";
import api from "../utils/api";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = "/api/users";

export default function AddUser() {
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post(API_URL, form);
      toast.success("✅ User added successfully!");
      setForm({ name: "", email: "", age: "" });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("❌ Error adding user:", error);
      toast.error(error.response?.data?.message || "Failed to add user. Please check your backend connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-white fw-bold mb-2">
            <span className="me-2">➕</span>Add New User
          </h2>
          <p className="text-white-50 mb-0">Create a new user profile</p>
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
                variant="success"
                size="lg"
                className="flex-fill submit-button-modern"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Adding User...
                  </>
                ) : (
                  <>
                    <span className="me-2">✅</span>Add User
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
