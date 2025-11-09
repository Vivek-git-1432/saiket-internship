const express = require("express");
const router = express.Router();
let users = require("../data/users");

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to validate age
function isValidAge(age) {
  return Number.isInteger(age) && age > 0 && age <= 120;
}

// Helper function for consistent success response
function sendSuccess(res, data, message = null, statusCode = 200) {
  const response = { success: true };
  if (message) response.message = message;
  if (data) {
    if (Array.isArray(data)) {
      response.users = data;
    } else {
      response.user = data;
    }
  }
  return res.status(statusCode).json(response);
}

// Helper function for consistent error response
function sendError(res, message, statusCode = 400) {
  return res.status(statusCode).json({
    success: false,
    message: message
  });
}

// Helper function to renumber all users sequentially starting from 1
function renumberUsers() {
  users = users.map((user, index) => ({
    ...user,
    id: index + 1
  }));
}

// Helper function to find the lowest available ID starting from 1
function findLowestAvailableId() {
  if (users.length === 0) return 1;
  
  // Get all existing IDs and sort them
  const existingIds = users.map(u => u.id).sort((a, b) => a - b);
  
  // Find the first gap or return the next sequential ID
  for (let i = 1; i <= existingIds.length; i++) {
    if (existingIds[i - 1] !== i) {
      return i;
    }
  }
  
  // If no gaps, return the next sequential ID
  return existingIds.length + 1;
}

// GET all users
router.get("/", (req, res) => {
  // Check if HTML is explicitly requested (browser navigation)
  const acceptHeader = req.headers.accept || "";
  const wantsHtml = acceptHeader.includes("text/html") && 
                    !acceptHeader.includes("application/json");
  
  // Check if JSON is explicitly requested
  const wantsJson = 
    req.query.format === "json" ||
    acceptHeader.includes("application/json");
  
  // Default to JSON for API clients (Postman, curl, etc.)
  // Only redirect to HTML if explicitly requested and not JSON
  if (wantsHtml && !wantsJson) {
    return res.redirect("/index.html");
  }

  // Return JSON by default (for Postman, API clients, etc.)
  // Sort users by ID to ensure consistent order
  const sortedUsers = [...users].sort((a, b) => a.id - b.id);
  return sendSuccess(res, sortedUsers);
});

// GET single user
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return sendError(res, "Invalid user ID. Must be a number.", 400);
  }

  const user = users.find(u => u.id === id);
  
  if (!user) {
    return sendError(res, "User not found", 404);
  }

  return sendSuccess(res, user);
});

// POST add user
router.post("/", (req, res) => {
  const { name, email, age } = req.body;

  // Validation
  if (!name || !email || age === undefined) {
    return sendError(res, "All fields (name, email, age) are required", 400);
  }

  if (typeof name !== "string" || name.trim().length === 0) {
    return sendError(res, "Name must be a non-empty string", 400);
  }

  if (typeof email !== "string" || !isValidEmail(email)) {
    return sendError(res, "Please provide a valid email address", 400);
  }

  const ageNum = Number(age);
  if (!isValidAge(ageNum)) {
    return sendError(res, "Age must be a positive integer between 1 and 120", 400);
  }

  // Check if email already exists
  const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    return sendError(res, "Email already exists", 409);
  }

  // Find the lowest available ID (fills gaps, starts from 1)
  const newId = findLowestAvailableId();
  const newUser = {
    id: newId,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    age: ageNum
  };

  users.push(newUser);
  
  // Sort users by ID to maintain order
  users.sort((a, b) => a.id - b.id);

  return sendSuccess(res, newUser, "User created successfully", 201);
});

// PUT update user
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return sendError(res, "Invalid user ID. Must be a number.", 400);
  }

  const idx = users.findIndex(u => u.id === id);

  if (idx === -1) {
    return sendError(res, "User not found", 404);
  }

  const { name, email, age } = req.body;
  const updatedUser = { ...users[idx] };

  // Update fields if provided
  if (name !== undefined) {
    if (typeof name !== "string" || name.trim().length === 0) {
      return sendError(res, "Name must be a non-empty string", 400);
    }
    updatedUser.name = name.trim();
  }

  if (email !== undefined) {
    if (typeof email !== "string" || !isValidEmail(email)) {
      return sendError(res, "Please provide a valid email address", 400);
    }
    
    // Check if email is already taken by another user
    const emailExists = users.some(u => u.id !== id && u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      return sendError(res, "Email already exists", 409);
    }
    
    updatedUser.email = email.trim().toLowerCase();
  }

  if (age !== undefined) {
    const ageNum = Number(age);
    if (!isValidAge(ageNum)) {
      return sendError(res, "Age must be a positive integer between 1 and 120", 400);
    }
    updatedUser.age = ageNum;
  }

  users[idx] = updatedUser;

  return sendSuccess(res, updatedUser, "User updated successfully");
});

// DELETE user
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return sendError(res, "Invalid user ID. Must be a number.", 400);
  }

  const initialLength = users.length;
  users = users.filter(u => u.id !== id);

  if (users.length === initialLength) {
    return sendError(res, "User not found", 404);
  }

  // Renumber all remaining users sequentially starting from 1
  renumberUsers();

  return sendSuccess(res, null, "User deleted successfully");
});

module.exports = router;
