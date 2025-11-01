const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const {register, login, verifyJWT} = require("./controllers/authController")
const userRoutes = require("./routes/userRoutes")
const membershipRoutes = require("./routes/membershipRoutes")
const attendanceRoutes = require("./routes/attendanceRoutes")
const trainerRoutes = require("./routes/trainerRoutes");
const classRoutes = require("./routes/classRoutes");

dotenv.config()
require("./config/db")

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.post("/api/auth/register", register)
app.post("/api/auth/login", login)

app.use("/api/user", userRoutes)
app.use("/api/membership", membershipRoutes)
app.use("/api/attendance", attendanceRoutes)
app.use("/api/trainers", trainerRoutes);
app.use("/api/classes", classRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found", path: req.originalUrl });
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})