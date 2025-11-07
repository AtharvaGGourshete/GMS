const express = require("express")
const router = express.Router()
const {
    getAllMemberships,
    getMembershipById,
    createMemberShip,
    updateMembershipByUserId,
    deleteMemberShip
} = require("../controllers/membershipController")

const {verifyJWT, verifyRole} = require("../controllers/authController")

router.get("/",verifyJWT, getAllMemberships)
router.get("/:id",verifyJWT, getMembershipById)
router.put("/:userId/plan", verifyJWT, verifyRole(["admin"]), updateMembershipByUserId); // 💡 New Route
router.post("/", verifyJWT, verifyRole(["admin"]), createMemberShip);
router.delete("/:id",verifyJWT, deleteMemberShip)

module.exports = router