

const express = require("express")
const router = express.Router()
const {
    getAllMemberships,
    getMembershipById,
    createMemberShip,
    updateMemberShip,
    deleteMemberShip
} = require("../controllers/membershipController")

const {verifyJWT} = require("../controllers/authController")

router.get("/",verifyJWT, getAllMemberships)
router.get("/:id",verifyJWT, getMembershipById)
router.post("/",verifyJWT, createMemberShip)
router.put("/:id",verifyJWT, updateMemberShip)
router.delete("/:id",verifyJWT, deleteMemberShip)

module.exports = router