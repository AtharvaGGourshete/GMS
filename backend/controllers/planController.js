// controllers/planController.js

const db = require("../config/db");

const getAllPlans = (req, res) => {
  // Assuming your plans table is named 'plans' and has 'id', 'name', 'duration_days', 'price'
  const query = `
    SELECT id, name, duration_days, price
    FROM plans
    ORDER BY duration_days ASC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching plans:", err);
      return res.status(500).json({ message: "Database Error fetching plans.", error: err });
    }

    // Return the plans data directly (as expected by the frontend fetchPlans function)
    res.status(200).json(results);
  });
};

module.exports = {
  getAllPlans,
};