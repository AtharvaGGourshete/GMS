const db = require("../config/db");

const getAllUsers = (req, res) => {
  const query = `SELECT id, full_name, email, phone, created_at FROM users WHERE role_id = 3;`;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database Error", error: err });
    }
    res.json(results);
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const query = `SELECT id, full_name, email, phone from users WHERE id = ?`;
  db.query(query, [id], (err, results) => {
    if (err)
      return res.status(500).json({ message: "Database Error", error: err });
    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(results[0]);
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { full_name, email, phone } = req.body;
  const query = `UPDATE users SET full_name = ?, email = ?, phone = ? WHERE id = ?`;
  db.query(query, [full_name, email, phone, id], (err, results) => {
    if (err)
      return res.status(500).json({ message: "Database Error", error: err });
    res.json({ message: "User updated successfully" });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  query = `DELETE FROM users WHERE id = ?`;
  db.query(query, [id], (err, results) => {
    if (err) res.status(500).json({ message: "Database Error", error: err });
    res.json({ message: "User deleted successfully" });
  });
};

const getUserAttendance = (req, res) => {
  const {id} = req.params;
    const query = `SELECT a.id AS attendance_id, c.name as class_name, a.status, a.attended_at FROM attendance a JOIN classes c ON a.class_id = c.id WHERE a.user_id = ?`
    db.quer(query, [id], (err, results) => {
      if (err) res.status(500).json({ message: "Database Error", error: err });
      res.json(results)
    })
  }

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserAttendance
};
