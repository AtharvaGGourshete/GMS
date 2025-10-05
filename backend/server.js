const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const {register, login, verifyJWT} = require("./controllers/authController")

dotenv.config()
require("./config/db")

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.post("/api/auth/register", register)
app.post("/api/auth/login", login)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})