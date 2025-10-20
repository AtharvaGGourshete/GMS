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
        const {full_name, email, phone, plan_id, join_date, expiry_date} = req.body;
        if(!full_name || !email || !plan_id){
            res.status(400).jsonb({
                message: "Full name, Email and Plan are required"
            })
        }

        const query = `INSERT INTO members (full_name, email, phone, plan_id, join_date, expiry_date) VALUES (?,?,?,?,?,?)`

        db.query(query,[full_name, email, phone || null , plan_id, join_date || null, expiry_date||null], (error, results) => {
            if (error){
                res.status(500).json({message: "Database error", error: error})
            }

            res.status(200).json({
                message: "Membership created successfully",
                membershipId: results.id
            })
        })
    } catch (error) {
        console.error("Error while creating membership: ",error)
        res.status(500).json({message: "Error while adding the user"})
    }
}

const updateMemberShip = async (req,res) => {
    try {
        const query = `UPDATE members SET full_name = ? , email = ?, phone = ?, plan_id = ?, join_date = ?, end_date = ? WHERE id = ?;`

        db.query(query,[full_name, email, phone, plan_id, start_date, end_date, id], (error, results) => {
            if (error){
                res.status(500).json({message: "Database error", error: error})
            }

            if (results.affectedRows === 0){
                return res.status(400).json({message: "Membership not found"})
            }

            res.status(200).json({message: "Membership updated successfully"})
        })
    } catch (error) {
        console.error("Error while updating the membership details", error)
    }
}

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
    updateMemberShip,
    deleteMemberShip
}