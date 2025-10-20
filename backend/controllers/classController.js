const db = require("../config/db");

// ✅ Create a new class (with trainer existence check)
exports.createClass = (req, res) => {
  const { name, trainer_id, schedule_time, capacity } = req.body;

  if (!name || !trainer_id || !schedule_time) {
    return res.status(400).json({ message: "Name, trainer_id and schedule_time are required." });
  }

  // Check if trainer exists
  db.query("SELECT id FROM trainers WHERE id = ?", [trainer_id], (err, trainerResult) => {
    if (err) {
      console.error("Error checking trainer:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (trainerResult.length === 0) {
      return res.status(404).json({ message: "Trainer not found." });
    }

    const query = `
      INSERT INTO classes (name, trainer_id, schedule_time, capacity)
      VALUES (?, ?, ?, ?)
    `;

    db.query(query, [name, trainer_id, schedule_time, capacity || 20], (err, result) => {
      if (err) {
        console.error("Error creating class:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      res.status(201).json({
        message: "Class created successfully.",
        classId: result.insertId,
      });
    });
  });
};

// ✅ Get all classes (with trainer name)
exports.getAllClasses = (req, res) => {
  const query = `
    SELECT c.id, c.name, c.schedule_time, c.capacity, t.name AS trainer_name
    FROM classes c
    JOIN trainers t ON c.trainer_id = t.id
    ORDER BY c.schedule_time ASC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching classes:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    res.status(200).json(results);
  });
};

// ✅ Get class by ID
exports.getClassById = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT c.id, c.name, c.schedule_time, c.capacity, t.name AS trainer_name
    FROM classes c
    JOIN trainers t ON c.trainer_id = t.id
    WHERE c.id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching class:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Class not found." });
    }

    res.status(200).json(results[0]);
  });
};

// ✅ Update class (with trainer validation)
exports.updateClass = (req, res) => {
  const { id } = req.params;
  const { name, trainer_id, schedule_time, capacity } = req.body;

  if (!name || !trainer_id || !schedule_time) {
    return res.status(400).json({ message: "Name, trainer_id, and schedule_time are required." });
  }

  // Validate trainer existence
  db.query("SELECT id FROM trainers WHERE id = ?", [trainer_id], (err, trainerResult) => {
    if (err) {
      console.error("Error checking trainer:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (trainerResult.length === 0) {
      return res.status(404).json({ message: "Trainer not found." });
    }

    const query = `
      UPDATE classes 
      SET name = ?, trainer_id = ?, schedule_time = ?, capacity = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    db.query(query, [name, trainer_id, schedule_time, capacity || 20, id], (err, result) => {
      if (err) {
        console.error("Error updating class:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      res.status(200).json({ message: "Class updated successfully." });
    });
  });
};

// ✅ Delete class
exports.deleteClass = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM classes WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting class:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Class not found." });
    }

    res.status(200).json({ message: "Class deleted successfully." });
  });
};
