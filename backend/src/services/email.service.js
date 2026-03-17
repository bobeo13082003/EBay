const transporter = require("../config/mailer");

exports.sendOTPEmail = async (email, otp) => {
    await transporter.sendMail({
        from: `"My App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify your account - OTP Code",
        html: `
            <h3>Email Verification</h3>
            <p>Your OTP code is:</p>
            <h1 style="letter-spacing:4px;">${otp}</h1>
            <p>This code is valid for <b>5 minutes</b>.</p>
        `,
    });
};
