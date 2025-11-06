const db = require("../config/db");



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
    SELECT c.id, c.name, c.schedule_time, c.capacity, u.full_name AS trainer_name
FROM classes c
JOIN users u ON c.trainer_user_id = u.id
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

exports.getClassesByTrainerId = (req, res) => {
  const trainerUserId = req.params.id;

  const query = `
    SELECT id, name, schedule_time, capacity, created_at
    FROM classes
    WHERE trainer_user_id = ?
    ORDER BY schedule_time DESC
  `;

  db.query(query, [trainerUserId], (err, results) => {
    if (err) {
      console.error("Error fetching classes by trainer ID:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
};


// Create class
exports.createClass = (req, res) => {
  const { name, schedule_time, capacity } = req.body;
  const trainerUserId = req.user.id;

  if (!name || !schedule_time) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const query = `
    INSERT INTO classes (name, trainer_user_id, schedule_time, capacity)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [name, trainerUserId, schedule_time, capacity || 20], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.status(201).json({ id: result.insertId, message: "Class created" });
  });
};

// Update class (only trainer who owns class)
exports.updateClass = (req, res) => {
  const { id } = req.params;
  const { name, schedule_time, capacity } = req.body;
  const trainerUserId = req.user.id;

  const query = `
    UPDATE classes 
    SET name = ?, schedule_time = ?, capacity = ?
    WHERE id = ? AND trainer_user_id = ?
  `;
  db.query(query, [name, schedule_time, capacity, id, trainerUserId], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Class not found or not owned by you" });
    }
    res.json({ message: "Class updated" });
  });
};

// Delete class (only trainer who owns class)
exports.deleteClass = (req, res) => {
  const { id } = req.params;
  const trainerUserId = req.user.id;

  const query = `
    DELETE FROM classes WHERE id = ? AND trainer_user_id = ?
  `;
  db.query(query, [id, trainerUserId], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Class not found or not owned by you" });
    }
    res.json({ message: "Class deleted" });
  });
};



