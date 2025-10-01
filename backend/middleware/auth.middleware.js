import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import User from '../models/user.model.js';

config();

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            // Use 401 for Unauthorized
            return res.status(401).json({ message: 'Authentication token missing.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Note: The check if (!decoded) is removed because jwt.verify throws on failure.
        // If it reaches here, the token is structurally valid.
        
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        req.userId = user._id;
        req.user = user;
        next();
        
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        
        // 🟢 CRITICAL FIX: Handle JWT-specific errors with 401 status.
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Authentication token expired. Please log in again.' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid authentication token. Please log in again.' });
        }
        
        // Fallback for other server errors
        res.status(500).json({ message: "Internal server error during authentication" });
    }
};

export const authorizeRoles = (...roles) => {
    // ... (rest of the authorizeRoles function is fine)
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) { // Added check for safety
            return res.status(403).json({ success: false, message: "Access denied: Insufficient privileges" });
        }
        next();
    };
};