const db = require("../config/db")

const getAllAttendance = (req, res) => {
    const query = `SELECT a.id m.full_name, a.status, a.date FROM attendance a LEFT JOIN members m ON a.member_id = m.id ORDER BY a.date DESC;`
    db.query(query, (error, results)=> {
        if(error){
            console.error(error)
            res.status(500).json({message: "Database error", error:error})
        }
        res.status(200).json({
            message: "Attendance fetched successfully",
            data: results
        })
    })
}

const getAttendanceByMember = (req, res) => {
  const { member_id } = req.params;

  const query = `
    SELECT a.id, a.date, a.status
    FROM attendance a
    WHERE a.member_id = ?
    ORDER BY a.date DESC;
  `;

  db.query(query, [member_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database Error", error: err });
    }

    if (results.length === 0)
      return res.status(404).json({ message: "No attendance found for this member" });

    res.status(200).json({
      message: "Attendance fetched successfully",
      data: results,
    });
  });
};

const markAttendance = (req, res) => {
  const { member_id, date, status } = req.body;

  if (!member_id || !date || !status) {
    return res.status(400).json({
      message: "Member ID, date, and status are required",
    });
  }

  const query = `
    INSERT INTO attendance (member_id, date, status)
    VALUES (?, ?, ?);
  `;

  db.query(query, [member_id, date, status], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database Error", error: err });
    }

    res.status(201).json({
      message: "Attendance marked successfully",
      attendanceId: result.insertId,
    });
  });
};

const updateAttendance = (req, res) => {
  const { id } = req.params;
  const { date, status } = req.body;

  const query = `
    UPDATE attendance
    SET date = ?, status = ?
    WHERE id = ?;
  `;

  db.query(query, [date, status, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database Error", error: err });
    }

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Attendance record not found" });

    res.status(200).json({ message: "Attendance updated successfully" });
  });
};

const deleteAttendance = (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM attendance WHERE id = ?;`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database Error", error: err });
    }

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Attendance record not found" });

    res.status(200).json({ message: "Attendance deleted successfully" });
  });
};

module.exports = {
  getAllAttendance,
  getAttendanceByMember,
  markAttendance,
  updateAttendance,
  deleteAttendance,
};