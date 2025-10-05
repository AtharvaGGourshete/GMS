// server/controllers/authController.js (Updated for final schema)
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- Register Controller ---
const register = async (req, res) => {
    // 🔑 Destructure fields to match the table schema
    const { email, password, full_name, phone } = req.body;
    
    // 1. Basic validation: full_name, email, and password are NOT NULL in schema
    if (!email || !password || !full_name) {
        return res.status(400).json({ message: 'Full name, email, and password are required' });
    }

    try {
        // 2. Hash the password for storage in 'password_hash' column
        const password_hash = await bcrypt.hash(password, 10);
        
        // 3. Updated SQL query and parameters to match the table schema
        // The 'role' field is NOT in your schema, so we REMOVE it.
        const query = `
            INSERT INTO users (full_name, email, password_hash, phone) 
            VALUES (?, ?, ?, ?)
        `;
        
        db.query(query, [full_name, email, password_hash, phone || null], (err, result) => {
            if (err) {
                // Check for duplicate entry error on 'email'
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ message: 'User with this email already exists.' });
                }
                console.error(err);
                return res.status(500).json({ message: 'Database error' });
            }
            res.status(201).json({ message: 'User registered successfully!' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// --- Login Controller ---
const login = (req, res) => {
    const { email, password } = req.body;

    // 4. Fetch 'password_hash' and 'full_name' from the database
    // The 'role' column is NOT in your schema, so we REMOVE it from the SELECT list.
    const selectQuery = 'SELECT id, full_name, email, password_hash FROM users WHERE email = ?';

    db.query(selectQuery, [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = results[0];
        // 5. Compare the plain text password with the stored hash from 'password_hash'
        const isMatch = await bcrypt.compare(password, user.password_hash); // 🚨 Corrected column reference

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 6. Generate JWT Token
        // The 'role' property is NOT included in the payload since it's not in the schema.
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ 
            message: 'Login successful', 
            token,
            // 7. Use 'full_name' for the response user object
            user: { id: user.id, name: user.full_name, email: user.email } // Use 'name' for frontend context simplicity
        });
    });
};

// --- JWT Verification Middleware ---
const verifyJWT = (req, res, next) => {
    // Check for Authorization header (Bearer <token>)
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Access Denied: No Token Provided!' });

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach decoded user payload (id, email) to request
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired Token' });
    }
};

module.exports = {
    register,
    login,
    verifyJWT
};