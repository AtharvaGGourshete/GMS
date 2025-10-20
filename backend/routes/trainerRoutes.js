const express = require("express");
const {
  createTrainer,
  getAllTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
} = require("../controllers/trainerController");
const {verifyJWT} = require("../controllers/authController")

const router = express.Router();

router.post("/", verifyJWT, createTrainer);
router.get("/", verifyJWT, getAllTrainers);
router.get("/:id", verifyJWT, getTrainerById);
router.put("/:id", verifyJWT, updateTrainer);
router.delete("/:id", verifyJWT, deleteTrainer);

module.exports = router;
