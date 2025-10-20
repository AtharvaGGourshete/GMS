const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserAttendance,
} = require("../controllers/userController");

const { verifyJWT } = require("../controllers/authController");

router.get("/", verifyJWT, getAllUsers)
router.get("/:id", verifyJWT, getUserById)
router.put("/:id". verifyJWT, updateUser)
router.delete("/:id", verifyJWT, deleteUser)
router.get("/:id/attendance", verifyJWT, getUserAttendance)

module.exports = router