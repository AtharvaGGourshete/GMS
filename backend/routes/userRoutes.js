const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserAttendance,
  createUser,
} = require("../controllers/userController");

const { verifyJWT, verifyRole } = require("../controllers/authController");

// Get all users - accessible by admin (1) and trainer (2)
router.get("/", verifyJWT, verifyRole(1, 2), getAllUsers);

// Get user by ID - accessible by authenticated users
router.get("/:id", verifyJWT, getUserById);

// Update user - accessible by authenticated users
router.put("/:id", verifyJWT, updateUser);

// Delete user - accessible by authenticated users
router.delete("/:id", verifyJWT, deleteUser);

// Create user - accessible only by admin (1)
router.post("/", verifyJWT, verifyRole(1), createUser);

// Get user attendance - accessible by authenticated users
router.get("/:id/attendance", verifyJWT, getUserAttendance);

module.exports = router;
