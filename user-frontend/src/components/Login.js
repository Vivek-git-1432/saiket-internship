import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a brief delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simple validation (frontend-only)
    if (form.username === "admin" && form.password === "12345") {
      // Use sessionStorage - clears when browser tab/window closes
      sessionStorage.setItem("loggedIn", "true");
      setIsLoggedIn(true);
      toast.success("✅ Login successful! Welcome back!");
      navigate("/");
    } else {
      toast.error("❌ Invalid credentials! Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="login-page-container">
      <div className="login-background-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className="fade-in d-flex justify-content-center align-items-center login-wrapper">
        <Card className="login-card-modern shadow-lg">
          <div className="login-card-header">
            <div className="login-icon-wrapper">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to manage your users</p>
          </div>

          <Card.Body className="login-card-body">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4 form-group-modern">
                <Form.Label className="form-label-modern">
                  <span className="label-icon">👤</span> Username
                </Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={handleChange}
                  className="form-control-modern"
                  required
                  autoFocus
                />
              </Form.Group>

              <Form.Group className="mb-4 form-group-modern">
                <Form.Label className="form-label-modern">
                  <span className="label-icon">🔒</span> Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="form-control-modern"
                  required
                />
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 login-button-modern"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <span className="button-icon">🚀</span> Sign In
                  </>
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
