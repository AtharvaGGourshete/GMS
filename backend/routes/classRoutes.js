const express = require("express");
const {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  getClassesByTrainerId
} = require("../controllers/classController");
const {verifyJWT, verifyRole} = require("../controllers/authController")

const router = express.Router();

router.get("/", verifyJWT, verifyRole(1), getAllClasses);
router.get("/:id", verifyJWT, getClassById);
router.get("/trainer/:id", verifyJWT, verifyRole(2), getClassesByTrainerId);
router.post("/", verifyJWT, verifyRole(2), createClass);
router.put("/:id", verifyJWT, verifyRole(2), updateClass);
router.delete("/:id", verifyJWT, verifyRole(2), deleteClass);


module.exports = router;
