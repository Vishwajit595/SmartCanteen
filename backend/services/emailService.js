const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});


// ===============================
// TEST GMAIL CONNECTION
// ===============================

transporter.verify((error, success) => {

    if (error) {

        console.error(
            "GMAIL CONNECTION FAILED:"
        );

        console.error(
            error.message
        );

    } else {

        console.log(
            "GMAIL CONNECTION SUCCESSFUL!"
        );

    }

});


// ===============================
// SEND VERIFICATION EMAIL
// ===============================

const sendVerificationEmail = async (
    email,
    name,
    verificationToken
) => {

    const verificationLink =
        `https://smartcanteen-frontend-7vie.onrender.com/verify-email?token=${verificationToken}`;


    const mailOptions = {

        from:
            `"SmartCanteen" <${process.env.EMAIL_USER}>`,

        to: email,

        subject:
            "Verify your SmartCanteen Email",

        html: `
            <div style="
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: auto;
                padding: 30px;
                border: 1px solid #ddd;
                border-radius: 10px;
            ">

                <h1 style="color: #ff6b35;">
                    🍴 SmartCanteen
                </h1>

                <h2>
                    Welcome ${name}!
                </h2>

                <p>
                    Thank you for registering with SmartCanteen.
                </p>

                <p>
                    Please verify your email address
                    before logging in.
                </p>

                <a
                    href="${verificationLink}"
                    style="
                        display: inline-block;
                        padding: 12px 20px;
                        background: #ff6b35;
                        color: white;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: bold;
                    "
                >
                    Verify Email
                </a>

                <p style="
                    margin-top: 25px;
                    color: #666;
                ">
                    This verification link will expire
                    in 30 minutes.
                </p>

            </div>
        `
    };


    await transporter.sendMail(mailOptions);

    console.log(
        "Verification email sent successfully to:",
        email
    );

};


module.exports = {
    sendVerificationEmail
};