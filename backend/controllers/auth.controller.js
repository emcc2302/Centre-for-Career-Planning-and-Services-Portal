import User from "../models/user.model.js";
import crypto from 'crypto';
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import dotenv from "dotenv";
import { sendVerificationEmail, sendPasswordResetEmail, sendPasswordResetSuccessEmail } from "../utils/emails.js";

dotenv.config();


export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!email.endsWith('@iitbhilai.ac.in')) {
            return res.status(400).json({ success: false, message: 'Only IIT Bhilai emails are allowed' });
        }

        const user = await User.findOne({ email });
        const verificationToken = Math.floor(100000 + (Math.random() * 900000)).toString();

        if (user) {
            if(user.isVerified){
                return res.status(400).json({ success: false, message: "User already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user.name = name; 
            user.password = hashedPassword;
            user.verificationToken = verificationToken;
            user.verificationTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; 

            await user.save();
            await sendVerificationEmail(user.email, verificationToken);

            return res.status(200).json({ success: true, userId: user._id });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("Generated verification code (signup):", verificationToken);

        const userData = {
            name,
            email,
            role,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 1 * 60 * 60 * 1000  // 1 hour
        }

        const newUser = new User(userData);
        const savedUser = await newUser.save();
        await sendVerificationEmail(newUser.email, verificationToken);

        res.status(200).json({ success: true, userId: savedUser._id });

    } catch (e) {
        console.error("Error in signup controller", e.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
};

export const sendCodeAgain = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'Missing Details' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid Details' });
        }

        const verificationToken = Math.floor(100000 + (Math.random() * 900000)).toString();

        user.verificationToken = verificationToken;
        user.verificationTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        await user.save();

        await sendVerificationEmail(user.email, verificationToken);

        res.status(200).json({ success: true, message: 'New verification code sent' });

    } catch (e) {
        console.error("Error in sendCodeAgain controller", e.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
}

export const verifyEmail = async (req, res) => {


    try {
        const { userId, code } = req.body;

        if (!userId || !code) {
            return res.status(400).json({ success: false, message: 'Missing Details' });
        }

        const stringCode = code.toString();

        const user = await User.findOne({
            _id: userId,
            verificationToken: stringCode,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        const newUser = await user.save();

        const token = generateTokenAndSetCookie(newUser._id, res);

        const userData = {

            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        }

        res.status(201).json({ success: true, message: "Email verified successfully", userData, token });

    } catch (e) {
        console.error("Error in verifyEmail controller", e.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (user && isPasswordCorrect) {
            if (!user.isVerified) {
                return res.status(400).json({ success: false, userId: user._id, message: "Email is not verified" });
            }
        }

        const token = generateTokenAndSetCookie(user._id, res);

        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }

        res.status(200).json({ success: true, userData, token });

    } catch (e) {
        console.log("error in login controller", e.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (e) {
        console.log("error in logout controller", e.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
}

export const forgotPassword = async (req, res) => {

    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Missing Details' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

        await user.save();

        // console.log(resetToken)

        const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        // console.log(user.email),
        await sendPasswordResetEmail( user.email, resetURL);

        res.status(200).json({ success: true, message: "Password reset link sent to your email" });

    } catch (e) {
        console.log("error in forgotPassword controller", e.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
}

export const resetPassword = async (req, res) => {

    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!token) {
            return res.status(400).json({ success: false, message: 'Missing Details' });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;

        await user.save();

        await sendPasswordResetSuccessEmail(user.email);

        res.status(200).json({ success: true, message: 'Password reset successful' });

    } catch (e) {
        console.log("error in resetPassword controller", e.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
}
