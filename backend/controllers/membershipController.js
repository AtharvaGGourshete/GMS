const db = require("../config/db");

const getAllMemberships = (req, res) => {
  const query = `
    SELECT m.id, m.full_name, m.email, m.phone, m.start_date, m.end_date, 
           p.plan_name, p.duration_months, p.price
    FROM members m
    LEFT JOIN plans p ON m.plan_id = p.id
    ORDER BY m.id DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database Error", error: err });
    }

    res.status(200).json({
      message: "Memberships fetched successfully",
      data: results,
    });
  });
};

const getMembershipById = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT m.*, p.plan_name, p.price 
    FROM members m
    LEFT JOIN plans p ON m.plan_id = p.id
    WHERE m.id = ?;
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database Error", error: err });
    }

    if (results.length === 0)
      return res.status(404).json({ message: "Membership not found" });

    res.status(200).json({ message: "Membership fetched successfully", data: results[0] });
  });
};

const createMemberShip = async (req,res) => {
    try {
        const {user_id, full_name, email, phone, plan_id, join_date, expiry_date} = req.body; 
        
        if(!user_id || !full_name || !email || !plan_id || !join_date || !expiry_date){
            return res.status(400).json({
                message: "User ID, Full name, Email, Plan ID, Join Date, and Expiry Date are required for membership creation."
            })
        }

        const query = `INSERT INTO members (user_id, full_name, email, phone, plan_id, join_date, expiry_date) VALUES (?,?,?,?,?,?,?)`

        db.query(query,[user_id, full_name, email, phone || null , plan_id, join_date, expiry_date], (error, results) => {
            if (error){
                console.error("Membership DB Error:", error);
                return res.status(500).json({message: "Database error during membership creation", error: error})
            }

            res.status(200).json({
                message: "Membership created successfully",
                membershipId: results.insertId
            })
        })
    } catch (error) {
        console.error("Error while creating membership: ",error)
        res.status(500).json({message: "Error while adding the user's membership"})
    }
}

const updateMembershipByUserId = (req, res) => {
    const { userId } = req.params;
    const { plan_id } = req.body;

    if (!plan_id) {
        return res.status(400).json({ message: "Plan ID is required for membership update." });
    }

    const fetchPlanQuery = `SELECT duration_days FROM plans WHERE id = ?`;

    db.query(fetchPlanQuery, [plan_id], (err, planResults) => {
        if (err || planResults.length === 0) {
            console.error("Error fetching plan duration:", err);
            return res.status(404).json({ message: "Selected plan not found or database error." });
        }

        const durationDays = planResults[0].duration_days;
        const joinDate = new Date().toISOString().split('T')[0];
        
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + parseInt(durationDays, 10));
        const newExpiryDate = expiryDate.toISOString().split('T')[0];
        
        const updateQuery = `
            UPDATE members 
            SET 
                plan_id = ?,
                join_date = ?,
                expiry_date = ?,
                status = 'active'
            WHERE user_id = ?
            ORDER BY created_at DESC 
            LIMIT 1
        `;

        db.query(updateQuery, [plan_id, joinDate, newExpiryDate, userId], (err, updateResults) => {
            if (err) {
                console.error("Error updating membership:", err);
                return res.status(500).json({ message: "Database error during membership update." });
            }

            if (updateResults.affectedRows === 0) {
                const insertQuery = `
                    INSERT INTO members (user_id, plan_id, join_date, expiry_date, status)
                    VALUES (?, ?, ?, ?, 'active')
                `;
                db.query(insertQuery, [userId, plan_id, joinDate, newExpiryDate], (insertErr) => {
                    if (insertErr) {
                         console.error("Error creating new membership:", insertErr);
                        return res.status(500).json({ message: "Membership not found, and failed to create new one." });
                    }
                     return res.status(200).json({ message: "New membership created successfully." });
                });
            } else {
                 res.status(200).json({ message: "Membership plan updated successfully." });
            }
        });
    });
};

const deleteMemberShip = async (req,res) => {
    const {id} = req.params;
    const query = `DELETE FROM members WHERE id = ?;`

    db.query(query, [id], (error, results) => {
        if (error){
            console.error(error)
            res.status(500).json({message: "Database error", error: error})
        }

        if (results.affectedRows === 0){
            return res.status(400).json({message: "Membership not found"})
        }

        res.status(200).json({message: "Membership cancelled successfully"})
    })
}

module.exports = {
    getAllMemberships,
    getMembershipById,
    createMemberShip,
    updateMembershipByUserId,
    deleteMemberShip
}