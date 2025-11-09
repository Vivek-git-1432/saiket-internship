const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Error fetching users",
      error: err.message 
    });
  }
});

// GET single user by ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid user ID" 
      });
    }
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }
    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Error fetching user",
      error: err.message 
    });
  }
});

// POST create user
router.post("/", async (req, res) => {
  try {
    let { name, email, age } = req.body;
    
    // Trim whitespace
    name = name ? name.trim() : '';
    email = email ? email.trim() : '';
    
    // Validation
    if (!name || !email || age === undefined || age === null) {
      return res.status(400).json({ 
        success: false,
        message: "Name, email, and age are required" 
      });
    }
    
    // Convert age to number if it's a string
    const ageNum = typeof age === 'string' ? parseInt(age, 10) : age;
    if (isNaN(ageNum) || ageNum < 0 || !Number.isInteger(ageNum)) {
      return res.status(400).json({ 
        success: false,
        message: "Age must be a positive integer" 
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid email format" 
      });
    }
    
    // Check if email already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: "Email already exists" 
      });
    }
    
    const newUser = await User.create({ name, email, age: ageNum });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser
    });
  } catch (err) {
    // Handle unique constraint violation (MySQL error code)
    if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
      return res.status(409).json({ 
        success: false,
        message: "Email already exists" 
      });
    }
    res.status(400).json({ 
      success: false,
      message: "Error creating user",
      error: err.message 
    });
  }
});

// PUT update user
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid user ID" 
      });
    }
    
    let { name, email, age } = req.body;
    
    // Trim whitespace
    name = name ? name.trim() : '';
    email = email ? email.trim() : '';
    
    // Validation
    if (!name || !email || age === undefined || age === null) {
      return res.status(400).json({ 
        success: false,
        message: "Name, email, and age are required" 
      });
    }
    
    // Convert age to number if it's a string
    const ageNum = typeof age === 'string' ? parseInt(age, 10) : age;
    if (isNaN(ageNum) || ageNum < 0 || !Number.isInteger(ageNum)) {
      return res.status(400).json({ 
        success: false,
        message: "Age must be a positive integer" 
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid email format" 
      });
    }
    
    // Check if user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }
    
    // Check if email is being changed and if new email already exists
    if (email !== existingUser.email) {
      const emailExists = await User.findByEmail(email);
      if (emailExists) {
        return res.status(409).json({ 
          success: false,
          message: "Email already exists" 
        });
      }
    }
    
    const updatedUser = await User.update(id, { name, email, age: ageNum });
    res.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    });
  } catch (err) {
    // Handle unique constraint violation (MySQL error code)
    if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
      return res.status(409).json({ 
        success: false,
        message: "Email already exists" 
      });
    }
    res.status(400).json({ 
      success: false,
      message: "Error updating user",
      error: err.message 
    });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid user ID" 
      });
    }
    
    const deleted = await User.delete(id);
    if (!deleted) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }
    res.json({ 
      success: true,
      message: "User deleted successfully",
      data: deleted
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Error deleting user",
      error: err.message 
    });
  }
});

module.exports = router;
