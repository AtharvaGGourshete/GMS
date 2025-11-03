const db = require("../config/db");
const bcrypt = require("bcryptjs");

// controllers/userController.js

// ... (existing imports)

const getAllUsers = (req, res) => {
    // 💡 ROBUST QUERY: Uses a subquery to find the MAX(created_at) or MAX(id) 
    // to reliably get the single, most recent membership record per user.

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
            // Log the detailed MySQL error to your server console
            console.error("MySQL Error Details:", err.sqlMessage); 
            
            // Send a helpful error message to the frontend
            return res.status(500).json({ 
                message: "Database Error fetching members. The server log contains the full SQL error details.", 
                error: err.sqlMessage || "Unknown SQL Error"
            });
        }
        // If successful, send the results array
        res.json(results);
    });
};

// ... (other functions and module.exports remain the same)

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

const createUser = async (req, res) => {
  // NOTE: The frontend now sends plan_id separately to /membership
  const { full_name, email, phone, password } = req.body; 

  if (!full_name || !email || !password)
    return res.status(400).json({ message: "All required fields must be filled" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (full_name, email, phone, password_hash, role_id) VALUES (?, ?, ?, ?, 3)`;
    
    // The insert operation needs to return the ID of the newly created user.
    // In many MySQL libraries, the results object contains insertId.
    db.query(query, [full_name, email, phone, hashedPassword], (err, results) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({ message: "Database Error", error: err });
      }
      
      // 👈 CRITICAL CHANGE: Return the new user ID
      res.status(201).json({ 
          message: "User created successfully",
          userId: results.insertId 
      }); 
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Error creating user" });
  }
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
  createUser,
  getUserAttendance
};
