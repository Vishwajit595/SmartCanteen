const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {

        // ===============================
        // USER NAME
        // ===============================

        name: {
            type: String,
            required: true
        },


        // ===============================
        // EMAIL
        // ===============================

        email: {
            type: String,
            required: true,
            unique: true
        },


        // ===============================
        // PASSWORD
        // ===============================

        password: {
            type: String,
            required: true
        },


        // ===============================
        // USER ROLE
        // ===============================

        role: {
            type: String,
            enum: ["student", "staff", "admin"],
            default: "student"
        },


        // ===============================
        // EMAIL VERIFICATION
        // ===============================

        isEmailVerified: {
            type: Boolean,
            default: false
        },

        emailVerificationToken: {
            type: String,
            default: null
        },

        emailVerificationExpires: {
            type: Date,
            default: null
        }

    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "User",
    userSchema
);