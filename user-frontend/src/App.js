import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container, Navbar, Nav, Button, Badge } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import api from "./utils/api";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import Login from "./components/Login";

function App() {
  const [dark, setDark] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  // Use sessionStorage instead of localStorage - clears when browser closes
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("loggedIn") === "true");

  // 🔄 Check backend connection every few seconds
  const checkBackend = async () => {
    try {
      const response = await api.get("/api/users", {
        timeout: 5000, // 5 second timeout
        validateStatus: function (status) {
          // Consider any status < 500 as success (even 404 means backend is responding)
          return status < 500;
        }
      });
      console.log("✅ Backend is online, response status:", response.status);
      setIsOnline(true);
    } catch (error) {
      console.error("❌ Backend check failed:", error.message);
      if (error.code === 'ECONNABORTED') {
        console.error("Request timeout - backend might be slow or offline");
      } else if (error.code === 'ERR_NETWORK') {
        console.error("Network error - backend might not be running");
      }
      setIsOnline(false);
    }
  };

  // Clear any old localStorage data on mount (migration from localStorage to sessionStorage)
  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      localStorage.removeItem("loggedIn");
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      checkBackend(); // first check on load
      const interval = setInterval(checkBackend, 5000); // repeat every 5s
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    sessionStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    toast.success("🚪 Logged out successfully!");
  };

  return (
    <>
      <div className={dark ? "dark-mode app-wrapper" : "app-wrapper"}>
        <Router>
          {isLoggedIn && (
            <Navbar bg={dark ? "dark" : "primary"} variant="dark" expand="lg" className="navbar-modern shadow-lg">
              <Container>
                <Navbar.Brand as={Link} to="/" className="navbar-brand-modern">
                  <span className="brand-icon">🌟</span> User Manager
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to="/" className="nav-link-modern">
                      <span className="me-1">👥</span>Users
                    </Nav.Link>
                    <Nav.Link as={Link} to="/add" className="nav-link-modern">
                      <span className="me-1">➕</span>Add User
                    </Nav.Link>
                  </Nav>

                  <div className="d-flex align-items-center gap-3">
                    {/* 🔵 Backend Status Indicator */}
                    <Badge 
                      bg={isOnline ? "success" : "danger"} 
                      className="backend-status-badge"
                      pill
                    >
                      <span className="status-dot"></span>
                      {isOnline ? "Backend Connected" : "Backend Offline"}
                    </Badge>
                    
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={handleLogout}
                      className="logout-button-modern"
                    >
                      <span className="me-1">🚪</span>Logout
                    </Button>
                    
                    {/* 🌗 Dark/Light toggle */}
                    <Button
                      variant={dark ? "light" : "warning"}
                      onClick={() => setDark(!dark)}
                      className="theme-toggle-button"
                      size="sm"
                    >
                      {dark ? "☀️" : "🌙"}
                    </Button>
                  </div>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          )}

          <Container className={isLoggedIn ? "mt-5 main-card" : "p-0"} fluid={!isLoggedIn}>
            <Routes>
              {!isLoggedIn ? (
                <>
                  <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                  <Route path="*" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<UserList />} />
                  <Route path="/add" element={<AddUser />} />
                  <Route path="/edit/:id" element={<EditUser />} />
                </>
              )}
            </Routes>
          </Container>

          <ToastContainer 
            position="top-right" 
            autoClose={3000} 
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={dark ? "dark" : "light"}
          />
        </Router>
      </div>
      
      {isLoggedIn && (
        <footer className="footer-modern text-center py-3">
          <p className="mb-0">
            © {new Date().getFullYear()} <strong>Vivek G L</strong> | Crafting Excellence in Full Stack Development
          </p>
          <p className="mb-0 mt-1" style={{ fontSize: "0.85rem", opacity: 0.8 }}>
            Building Modern Web Applications with Passion & Precision
          </p>
        </footer>
      )}
    </>
  );
}

export default App;

