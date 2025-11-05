const express = require("express");
const {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
} = require("../controllers/classController");
const {verifyJWT, verifyRole} = require("../controllers/authController")

const router = express.Router();

router.post("/", verifyJWT, createClass);
router.get("/", verifyJWT, verifyRole(["admin"]), getAllClasses);
router.get("/:id", verifyJWT, getClassById);
router.put("/:id", verifyJWT, updateClass);
router.delete("/:id", verifyJWT, deleteClass);

module.exports = router;
