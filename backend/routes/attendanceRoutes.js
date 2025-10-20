const express = require("express");
const router = express.Router();
const {
  getAllAttendance,
  getAttendanceByMember,
  markAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");
const { verifyJWT } = require("../controllers/authController");

router.get("/", verifyJWT, getAllAttendance);
router.get("/member/:member_id", verifyJWT, getAttendanceByMember);
router.post("/", verifyJWT, markAttendance);
router.put("/:id", verifyJWT, updateAttendance);
router.delete("/:id", verifyJWT, deleteAttendance);

module.exports = router;
