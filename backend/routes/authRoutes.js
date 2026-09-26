const express = require("express");

const {
    registerUser,
    loginUser,
    createStaffUser
} = require("../controllers/authController");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();


// Student registration
router.post("/register", registerUser);


// Login
router.post("/login", loginUser);


// Create staff account
// Only logged-in admin can use this route
router.post(
    "/create-staff",
    protect,
    adminOnly,
    createStaffUser
);


module.exports = router;