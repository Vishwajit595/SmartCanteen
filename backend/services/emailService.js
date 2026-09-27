const sendVerificationEmail = async (
    email,
    name,
    verificationToken
) => {

    const verificationLink =
        `https://smartcanteen-frontend-7vie.onrender.com/verify-email?token=${verificationToken}`;

    const response = await fetch(
        "https://api.brevo.com/v3/smtp/email",
        {
            method: "POST",

            headers: {
                "accept": "application/json",
                "api-key": process.env.BREVO_API_KEY,
                "content-type": "application/json"
            },

            body: JSON.stringify({
                sender: {
                    name: "SmartCanteen",
                    email: process.env.EMAIL_USER
                },

                to: [
                    {
                        email: email,
                        name: name
                    }
                ],

                subject: "Verify your SmartCanteen account",

                htmlContent: `
                    <div style="font-family: Arial, sans-serif; padding: 20px;">
                        
                        <h2>Welcome to SmartCanteen, ${name}!</h2>

                        <p>
                            Thank you for registering with SmartCanteen.
                        </p>

                        <p>
                            Please click the button below to verify your email address:
                        </p>

                        <a href="${verificationLink}"
                           style="
                               display: inline-block;
                               padding: 12px 20px;
                               background-color: #28a745;
                               color: white;
                               text-decoration: none;
                               border-radius: 6px;
                               font-weight: bold;
                           ">
                            Verify Email
                        </a>

                        <p style="margin-top: 20px;">
                            This verification link will expire after 30 minutes.
                        </p>

                        <p>
                            If you did not create this account, you can ignore this email.
                        </p>

                        <p>
                            Regards,<br>
                            <strong>SmartCanteen Team</strong>
                        </p>

                    </div>
                `
            })
        }
    );

    if (!response.ok) {

        const errorData = await response.text();

        console.error(
            "Brevo Email Error:",
            errorData
        );

        throw new Error(
            "Verification email could not be sent"
        );
    }

    const result = await response.json();

    console.log(
        "Verification email sent successfully:",
        result.messageId
    );

    return result;
};

module.exports = {
    sendVerificationEmail
};