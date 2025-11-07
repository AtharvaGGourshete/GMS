const db = require("../config/db");
const bcrypt = require("bcryptjs");

const getAllUsers = (req, res) => {
  const query = `
    SELECT 
      u.id, 
      u.full_name, 
      u.email, 
      u.phone, 
      u.created_at,
      m_latest.plan_id,          
      p.name AS plan_name, 
      m_latest.expiry_date,
      m_latest.status AS membership_status
    FROM users u      
    LEFT JOIN (
      SELECT 
        user_id, 
        MAX(id) AS latest_member_id
      FROM members
      GROUP BY user_id
    ) AS max_m ON u.id = max_m.user_id
    LEFT JOIN members m_latest ON m_latest.id = max_m.latest_member_id
    LEFT JOIN plans p ON m_latest.plan_id = p.id
    WHERE u.role_id = 3
    ORDER BY u.created_at DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database Error fetching all users with plans:", err);
      console.error("MySQL Error Details:", err.sqlMessage);
      
      return res.status(500).json({ 
        message: "Database Error fetching members.", 
        error: err.sqlMessage || "Unknown SQL Error"
      });
    }
    
    res.json(results);
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const query = `SELECT id, full_name, email, phone FROM users WHERE id = ?`;
  
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database Error", error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(results[0]);
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { full_name, email, phone } = req.body;
  const query = `UPDATE users SET full_name = ?, email = ?, phone = ? WHERE id = ?`;
  
  db.query(query, [full_name, email, phone, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database Error", error: err });
    }
    res.json({ message: "User updated successfully" });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM users WHERE id = ?`;
  
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database Error", error: err });
    }
    res.json({ message: "User deleted successfully" });
  });
};

const createUser = async (req, res) => {
  try {
    const { full_name, email, phone, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({ message: "Full name, email, and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const role_id = 3;

    const query = `
      INSERT INTO users (full_name, email, phone, password_hash, role_id)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [full_name, email, phone, hashedPassword, role_id], (err, result) => {
      if (err) {
        console.error("Database error inserting user:", err);
        return res.status(500).json({ message: "Database error", error: err.sqlMessage });
      }

      res.status(201).json({
        message: "User created successfully",
        userId: result.insertId,
      });
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getUserAttendance = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT 
      a.id AS attendance_id, 
      c.name AS class_name, 
      a.status, 
      a.attended_at 
    FROM attendance a 
    JOIN classes c ON a.class_id = c.id 
    WHERE a.user_id = ?
  `;
  
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database Error", error: err });
    }
    res.json(results);
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  getUserAttendance
};
