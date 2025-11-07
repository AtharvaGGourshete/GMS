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
router.get("/", verifyJWT, verifyRole(1, 2), getAllUsers);
router.get("/:id", verifyJWT, getUserById);
router.put("/:id", verifyJWT, updateUser);
router.delete("/:id", verifyJWT, deleteUser);
router.post("/", verifyJWT, verifyRole(1), createUser);
router.get("/:id/attendance", verifyJWT, getUserAttendance);

module.exports = router;
