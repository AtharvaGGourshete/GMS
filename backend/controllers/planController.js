const db = require("../config/db");

const getAllPlans = (req, res) => {
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

    res.status(200).json(results);
  });
};

module.exports = {
  getAllPlans,
};