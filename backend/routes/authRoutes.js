const express = require("express");

const {
    registerUser,
    verifyEmail,
    loginUser,
    createStaffUser,
    getAllStaff
} = require("../controllers/authController");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();


// ===============================
// STUDENT REGISTRATION
// ===============================

router.post(
    "/register",
    registerUser
);


// ===============================
// EMAIL VERIFICATION
// ===============================

router.get(
    "/verify-email",
    verifyEmail
);


// ===============================
// LOGIN
// ===============================

router.post(
    "/login",
    loginUser
);


// ===============================
// CREATE STAFF ACCOUNT
// ADMIN ONLY
// ===============================

router.post(
    "/create-staff",
    protect,
    adminOnly,
    createStaffUser
);


// ===============================
// GET ALL STAFF
// ADMIN ONLY
// ===============================

router.get(
    "/staff",
    protect,
    adminOnly,
    getAllStaff
);


module.exports = router;