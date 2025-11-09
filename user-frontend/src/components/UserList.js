import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Button, Card, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = "/api/users";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get(API_URL);
      
      // Handle different response formats
      let usersData = [];
      
      if (Array.isArray(res.data)) {
        // Direct array response
        usersData = res.data;
      } else if (res.data && Array.isArray(res.data.users)) {
        // Response with users property
        usersData = res.data.users;
      } else if (res.data && Array.isArray(res.data.data)) {
        // Response with data property
        usersData = res.data.data;
      } else if (res.data && typeof res.data === 'object') {
        // Single object or other structure
        console.warn("Unexpected response format:", res.data);
        usersData = [];
      } else {
        usersData = [];
      }
      
      // Ensure usersData is always an array
      if (!Array.isArray(usersData)) {
        console.error("Users data is not an array:", usersData);
        usersData = [];
      }
      
      setUsers(usersData);
      console.log("✅ Users loaded successfully:", usersData);
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      console.error("Error details:", error.response?.data || error.message);
      toast.error(`Failed to load users: ${error.response?.data?.message || error.message || "Check backend connection"}`);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // Refresh users every 10 seconds
    const interval = setInterval(fetchUsers, 10000);
    return () => clearInterval(interval);
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm("⚠️ Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        setDeletingId(id);
        await api.delete(`${API_URL}/${id}`);
        toast.success("✅ User deleted successfully!");
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user. Please try again.");
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="fade-in text-center py-5">
        <Spinner animation="border" variant="primary" size="lg" className="mb-3" />
        <p className="text-white">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-white fw-bold mb-2">
            <span className="me-2">👥</span>User Management
          </h2>
          <p className="text-white-50 mb-0">Manage all your users in one place</p>
        </div>
        <Link to="/add" className="btn btn-success btn-lg add-user-button">
          <span className="me-2">➕</span>Add New User
        </Link>
      </div>

      {users.length === 0 ? (
        <Card className="empty-state-card text-center py-5">
          <Card.Body>
            <div className="empty-state-icon mb-3">📭</div>
            <h4 className="text-white mb-3">No Users Found</h4>
            <p className="text-white-50 mb-4">Get started by adding your first user!</p>
            <Link to="/add" className="btn btn-primary btn-lg">
              <span className="me-2">➕</span>Add Your First User
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <Row className="g-4">
          {Array.isArray(users) && users.map((u, index) => (
            <Col key={u.id || u._id || index} xs={12} md={6} lg={4}>
              <Card className="user-card-modern h-100 shadow-lg">
                <Card.Body className="p-4">
                  <div className="user-card-header mb-3">
                    <div className="user-avatar">
                      {u.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="user-info">
                      <h5 className="user-name mb-1">{u.name || "Unknown"}</h5>
                      <p className="user-email text-muted mb-0">
                        <small>{u.email || "No email"}</small>
                      </p>
                    </div>
                  </div>

                  <div className="user-details mb-4">
                    <div className="detail-item">
                      <span className="detail-icon">📧</span>
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{u.email || "N/A"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">🎂</span>
                      <span className="detail-label">Age:</span>
                      <span className="detail-value">{u.age || "N/A"}</span>
                    </div>
                  </div>

                  <div className="user-actions d-flex gap-2">
                    <Link
                      to={`/edit/${u.id || u._id}`}
                      className="btn btn-warning btn-sm flex-fill edit-button"
                    >
                      <span className="me-1">✏️</span>Edit
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteUser(u.id || u._id)}
                      disabled={deletingId === (u.id || u._id)}
                      className="flex-fill delete-button"
                    >
                      {deletingId === (u.id || u._id) ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-1" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <span className="me-1">🗑️</span>Delete
                        </>
                      )}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {users.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-white-50">
            <span className="me-2">📊</span>
            Total Users: <strong className="text-white">{users.length}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
