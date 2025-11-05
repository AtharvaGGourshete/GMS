const db = require("../config/db");

exports.createClass = (req, res) => {
  // Destructure the new field name: trainer_user_id
  const { name, trainer_user_id, schedule_time, capacity } = req.body;

  // Basic validation (you should add more robust validation)
  if (!name || !trainer_user_id || !schedule_time) {
    return res.status(400).json({ message: "Missing required class fields." });
  }

  // 🚨 IMPORTANT: The INSERT query MUST use the new column name (trainer_user_id)
  const query = `
    INSERT INTO classes (name, trainer_user_id, schedule_time, capacity)
    VALUES (?, ?, ?, ?)
  `;
  const values = [name, trainer_user_id, schedule_time, capacity || 20]; // Default capacity to 20 if not provided

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error creating class:", err);
      // Check for Foreign Key constraint violation (e.g., trainer_user_id doesn't exist or isn't a trainer)
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
         return res.status(409).json({ message: "Invalid Trainer ID or Trainer does not exist." });
      }
      return res.status(500).json({ message: "Database error during class creation." });
    }
    res.status(201).json({ 
        id: result.insertId, 
        message: "Class created successfully!" 
    });
  });
};

// ✅ Get all classes (with trainer name)
exports.getAllClasses = (req, res) => {
  const query = `
    SELECT
      c.id,
      c.name,
      c.schedule_time,
      c.capacity,
      c.created_at,
      u.full_name AS trainer_name 
    FROM classes c
    JOIN users u ON c.trainer_user_id = u.id  
    WHERE u.role_id = 2
    ORDER BY c.schedule_time DESC
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

exports.updateClass = (req, res) => {
  const { id } = req.params; // Class ID to update
  // Destructure the new field name: trainer_user_id
  const { name, trainer_user_id, schedule_time, capacity } = req.body;

  // Basic validation
  if (!name || !trainer_user_id || !schedule_time) {
    return res.status(400).json({ message: "Missing required class fields." });
  }

  // 🚨 IMPORTANT: The UPDATE query MUST use the new column name (trainer_user_id)
  const query = `
    UPDATE classes 
    SET 
      name = ?, 
      trainer_user_id = ?, 
      schedule_time = ?, 
      capacity = ?, 
      updated_at = NOW()
    WHERE id = ?
  `;
  const values = [name, trainer_user_id, schedule_time, capacity || 20, id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating class:", err);
       // Check for Foreign Key constraint violation
       if (err.code === 'ER_NO_REFERENCED_ROW_2') {
         return res.status(409).json({ message: "Invalid Trainer ID or Trainer does not exist." });
      }
      return res.status(500).json({ message: "Database error during class update." });
    }
    
    if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Class not found." });
    }
    
    res.status(200).json({ message: "Class updated successfully!" });
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
