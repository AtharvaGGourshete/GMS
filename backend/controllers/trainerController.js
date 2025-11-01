const db = require("../config/db");

exports.createTrainer = (req, res) => {
  const { specialization, certifications } = req.body;

  if (!specialization) {
    return res.status(400).json({ message: "Specialization is required" });
  }

  const user_id = req.user.id;

  db.query("SELECT id FROM trainers WHERE user_id = ?", [user_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "This user is already a trainer" });
    }

    const query = `
      INSERT INTO trainers (user_id, specialization, certifications)
      VALUES (?, ?, ?)
    `;

    db.query(query, [user_id, specialization, certifications || null], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      res.status(201).json({
        message: "Trainer created successfully",
        trainerId: result.insertId,
      });
    });
  });
};

exports.getAllTrainers = (req, res) => {
  const query = `
    SELECT t.id, u.full_name, u.email, t.specialization, t.certifications
    FROM trainers t
    JOIN users u ON t.user_id = u.id
    ORDER BY t.created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    res.status(200).json(results);
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

  db.query(query, [specialization, certifications || null, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    res.status(200).json({ message: "Trainer updated successfully" });
  });
};

exports.deleteTrainer = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM trainers WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    res.status(200).json({ message: "Trainer deleted successfully" });
  });
};
