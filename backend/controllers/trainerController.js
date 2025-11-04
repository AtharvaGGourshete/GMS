const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.createTrainer = async (req, res) => {
  try {
    const { full_name, email, phone, specialization, certifications } = req.body;

    if (!full_name || !email || !phone || !specialization) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });

      if (results.length > 0)
        return res.status(400).json({ message: "Email already exists." });

      const password_hash = await bcrypt.hash("default123", 10);
      const role_id = 2; // trainer

      db.query(
        "INSERT INTO users (full_name, email, password_hash, phone, role_id) VALUES (?, ?, ?, ?, ?)",
        [full_name, email, password_hash, phone, role_id],
        (err, userResult) => {
          if (err) return res.status(500).json({ message: "Database error", error: err });

          const user_id = userResult.insertId;

          db.query(
            "INSERT INTO trainers (user_id, specialization, certifications) VALUES (?, ?, ?)",
            [user_id, specialization, certifications || ""],
            (err2) => {
              if (err2) return res.status(500).json({ message: "Database error", error: err2 });

              return res.status(201).json({
                message: "Trainer created successfully",
                user_id,
              });
            }
          );
        }
      );
    });
  } catch (err) {
    console.error("Trainer creation error:", err);
    return res.status(500).json({ message: "Server error", error: err });
  }
};

// Get all trainers
exports.getAllTrainers = (req, res) => {
  const query = `
    SELECT 
      t.id AS trainer_id,
      u.id AS user_id,
      u.full_name,
      u.email,
      u.phone,
      t.specialization,
      t.certifications,
      t.created_at
    FROM trainers t
    JOIN users u ON t.user_id = u.id
    WHERE u.role_id = 2
    ORDER BY t.created_at DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.status(200).json({ success: true, data: results });
  });
};

// Delete trainer
exports.deleteTrainer = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM trainers WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Trainer not found" });
    res.status(200).json({ message: "Trainer deleted successfully" });
  });
};

exports.getTrainerById = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT t.id, u.full_name, u.email, t.specialization, t.certifications
    FROM trainers t
    JOIN users u ON t.user_id = u.id
    WHERE t.id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    
    res.status(200).json(results[0]);
  });
};

exports.updateTrainer = (req, res) => {
  const { specialization, certifications } = req.body;
  const { id } = req.params;

  if (!specialization) {
    return res.status(400).json({ message: "Specialization is required" });
  }

  const query = `
    UPDATE trainers
    SET specialization = ?, certifications = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.query(
    query,
    [specialization, certifications || null, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Trainer not found" });
      }

      res.status(200).json({ message: "Trainer updated successfully" });
    }
  );
};

