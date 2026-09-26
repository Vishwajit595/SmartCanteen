const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const {
    sendVerificationEmail
} = require("../services/emailService");


// ===============================
// STUDENT REGISTRATION
// ===============================

const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }


        // Generate verification token
        const verificationToken =
            crypto.randomBytes(32).toString("hex");


        // Token expires after 15 minutes
        const verificationExpires =
            new Date(Date.now() + 30 * 60 * 1000);


        // Hash password
        const hashedPassword =
            await bcrypt.hash(password, 10);


        // Create student
        const user = await User.create({

            name,

            email,

            password: hashedPassword,

            role: "student",

            isEmailVerified: false,

            emailVerificationToken:
                verificationToken,

            emailVerificationExpires:
                verificationExpires

        });


        // Send verification email
        try {

            await sendVerificationEmail(
                email,
                name,
                verificationToken
            );

        } catch (emailError) {

            // Remove user if email could not be sent
            await User.findByIdAndDelete(user._id);

            return res.status(500).json({
                message:
                    "Registration failed. Verification email could not be sent."
            });

        }


        res.status(201).json({

            message:
                "Registration successful. Please check your email to verify your account."

        });

    } catch (error) {

        console.error(
            "Registration Error:",
            error
        );

        res.status(500).json({

            message: "Registration failed",

            error: error.message

        });

    }
};


// ===============================
// VERIFY EMAIL
// ===============================

const verifyEmail = async (req, res) => {

    try {

        const { token } = req.query;


        if (!token) {

            return res.status(400).json({

                message:
                    "Verification token is missing."

            });

        }


        const user = await User.findOne({

            emailVerificationToken: token,

            emailVerificationExpires: {
                $gt: new Date()
            }

        });


        if (!user) {

            return res.status(400).json({

                message:
                    "Invalid or expired verification link."

            });

        }


        user.isEmailVerified = true;

        user.emailVerificationToken = null;

        user.emailVerificationExpires = null;


        await user.save();


        res.json({

            message:
                "Email verified successfully. You can now login."

        });

    } catch (error) {

        console.error(
            "Email Verification Error:",
            error
        );

        res.status(500).json({

            message:
                "Email verification failed",

            error: error.message

        });

    }
};


// ===============================
// LOGIN
// ===============================

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;


        const user = await User.findOne({ email });


        if (!user) {

            return res.status(400).json({

                message:
                    "Invalid email or password"

            });

        }


        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!isMatch) {

            return res.status(400).json({

                message:
                    "Invalid email or password"

            });

        }


        // Students must verify email
        if (
            user.role === "student" &&
            user.isEmailVerified !== true
        ) {

            return res.status(403).json({

                message:
                    "Please verify your email before logging in."

            });

        }


        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );


        res.json({

            message:
                "Login successful",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });

    } catch (error) {

        console.error(
            "Login Error:",
            error
        );

        res.status(500).json({

            message:
                "Login failed",

            error: error.message

        });

    }
};


// ===============================
// CREATE STAFF ACCOUNT
// ===============================

const createStaffUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;


        const existingUser =
            await User.findOne({ email });


        if (existingUser) {

            return res.status(400).json({

                message:
                    "User already exists"

            });

        }


        const hashedPassword =
            await bcrypt.hash(password, 10);


        const user = await User.create({

            name,

            email,

            password: hashedPassword,

            role: "staff",

            isEmailVerified: true

        });


        res.status(201).json({

            message:
                "Staff account created successfully",

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });

    } catch (error) {

        res.status(500).json({

            message:
                "Staff creation failed",

            error: error.message

        });

    }

};


// ===============================
// GET ALL STAFF USERS
// ===============================

const getAllStaff = async (req, res) => {

    try {

        const staffUsers =
            await User.find(

                { role: "staff" },

                {
                    name: 1,
                    email: 1,
                    role: 1
                }

            );


        res.json({

            message:
                "Staff users fetched successfully",

            staff: staffUsers

        });

    } catch (error) {

        res.status(500).json({

            message:
                "Failed to fetch staff users",

            error: error.message

        });

    }

};


// ===============================
// EXPORT FUNCTIONS
// ===============================

module.exports = {

    registerUser,

    verifyEmail,

    loginUser,

    createStaffUser,

    getAllStaff

};