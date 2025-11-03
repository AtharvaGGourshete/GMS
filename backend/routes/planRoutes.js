// routes/planRoutes.js

const express = require("express");
const router = express.Router();
const { getAllPlans } = require("../controllers/planController");
const { verifyJWT, verifyRole } = require("../controllers/authController"); // Assuming plans should only be accessible to logged-in admins/users

// Route to fetch all plans
// Assuming this is safe to be viewed by authenticated users (or just admin if you prefer strict control)
router.get("/", verifyJWT, getAllPlans); 

module.exports = router;