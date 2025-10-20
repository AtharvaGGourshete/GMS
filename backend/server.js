const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const {register, login, verifyJWT} = require("./controllers/authController")
const userRoutes = require("./routes/userRoutes")
 
dotenv.config()
require("./config/db")

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.post("/api/auth/register", register)
app.post("/api/auth/login", login)

app.use("/api/users", userRoutes)
// app,get("/", (req, res) => {
//     res.send()
// })

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})