const { Users } = require("../models/users");
const { generateOTP } = require("../utils/otp");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendOTPEmail } = require("../services/email.service");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
exports.register = async (req, res) => {
    const { username, email, password, country } = req.body;

    try {
        const normalizedEmail = email.toLowerCase().trim();

        const existingUser = await Users.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ message: "Email is exist", status: 400 });
        }

        const existingUsername = await Users.findOne({ username });
        if (existingUsername) {
            return res
                .status(400)
                .json({ message: "Username is exist", status: 400 });
        }

        const otp = generateOTP();
        const hashedOTP = await bcrypt.hash(otp, 10);


        const user = new Users({
            username: username.trim(),
            email: normalizedEmail,
            password: password,
            role: "buyer",
            avatarURL: "",
            isActive: false,
            otp: hashedOTP,
            otpExpires: Date.now() + 5 * 60 * 1000,
            country
        });

        await user.save();

        await sendOTPEmail(normalizedEmail, otp);

        res.status(201).json({
            message:
                "Register successfully, please check your email to verify account",
            status: 201,
        });
    } catch (err) {
        console.error("Registration error:", {
            message: err.message,
            stack: err.stack,
        });
        res.status(500).json({ message: "Register fail, please try again." });
    }
};

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    const user = await Users.findOne({ email: email.toLowerCase().trim() });
    if (!user || !user.otp) {
        return res.status(400).json({ message: "Invalid request" });
    }

    if (user.otpExpires < Date.now()) {
        return res.status(400).json({ message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isActive = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Account verified successfully", status: 200 });
};



exports.loginWithGoogle = async (req, res) => {
    const { idToken } = req.body;

    try {
        // 1️⃣ Verify token từ Google
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const {
            sub: googleId,
            email,
            name,
            picture,
        } = payload;

        // 2️⃣ Tìm user
        let user = await Users.findOne({
            $or: [{ googleId }, { email }],
        });

        // 3️⃣ Nếu chưa có → tạo mới
        if (!user) {
            user = await Users.create({
                username: name,
                email,
                googleId,
                avatarURL: picture,
                isActive: true,
            });
        } else if (!user.googleId) {
            // Link account
            user.googleId = googleId;
            await user.save();
        }

        // 4️⃣ Tạo JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login with Google successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatarURL: user.avatarURL,
            },
            status: 200
        });

    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Google authentication failed" });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                status: 400,
            });
        }

        const user = await Users.findOne({
            email: email.toLowerCase().trim(),
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
                status: 400,
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                message: "Please verify your account first",
                status: 403,
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
                status: 400,
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            status: 200,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                avatarURL: user.avatarURL,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({
            message: "Login failed, please try again",
            status: 500,
        });
    }
};



