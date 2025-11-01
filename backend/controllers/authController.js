const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password, full_name, phone, role_id } = req.body;

  if (!email || !password || !full_name) {
    return res.status(400).json({ message: "Full name, email, and password are required" });
  }

  try {
    const password_hash = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (full_name, email, password_hash, phone, role_id)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [full_name, email, password_hash, phone || null, role_id || 3],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "User with this email already exists." });
          }
          console.error(err);
          return res.status(500).json({ message: "Database error" });
        }

        res.status(201).json({ message: "User registered successfully!" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error during registration" });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;
  const selectQuery = `
    SELECT users.id, users.full_name, users.email, users.password_hash, roles.name AS role
    FROM users
    JOIN roles ON users.role_id = roles.id
    WHERE email = ?
  `;

  db.query(selectQuery, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.full_name, email: user.email, role: user.role },
    });
  });
};

// JWT verification middleware
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Access Denied: No Token Provided!" });

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired Token" });
  }
};

// Role-based authorization middleware
const verifyRole = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied: Insufficient privileges" });
    }
    next();
  };
};

module.exports = {
  register,
  login,
  verifyJWT,
  verifyRole
};
