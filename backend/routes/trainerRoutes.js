const express = require("express");
const {
  createTrainer,
  getAllTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
} = require("../controllers/trainerController");
const {verifyJWT, verifyRole} = require("../controllers/authController")

const router = express.Router();


router.post("/", verifyJWT, verifyRole(["admin"]), createTrainer);
router.get("/", verifyJWT, getAllTrainers);
router.delete("/:id", verifyJWT, verifyRole(["admin"]), deleteTrainer);
router.get("/:id", verifyJWT, getTrainerById);
router.put("/:id", verifyJWT, updateTrainer);

module.exports = router;
