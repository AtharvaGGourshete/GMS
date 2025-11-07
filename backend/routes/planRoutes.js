const express = require("express");
const router = express.Router();
const { getAllPlans } = require("../controllers/planController");
const { verifyJWT, verifyRole } = require("../controllers/authController");
router.get("/", verifyJWT, getAllPlans); 

module.exports = router;