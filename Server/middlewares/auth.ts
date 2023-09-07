import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from 'express';
import { User, UserDocumentId } from "../models/userModel.js";
import { JwtPayload } from '../utils/types.js'

declare global {
    namespace Express {
        interface Request {
            cookies: {
                [key: string]: string;
            };
            user?: UserDocumentId; // Define the user property
        }
    }
}

// Check if the user is authenticated by verifying their token
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the token from the request cookies
        const { token } = req.cookies;

        // If the token doesn't exist, return an error message
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first!",
            });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                success: false,
                message: "Internal Error",
            });
        }

        // Verify the token using the JWT secret
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

        // Find the user associated with the decoded token's ID
        const user = await User.findById(decodedToken._id);

        // If the user doesn't exist, return an error message
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

        // Set the user object in the request for future use
        req.user = user;

        // Continue to the next middleware function
        next();
    }
    catch (error: any) {
        // If an error occurs, return a generic error message
        res.status(500).json({ success: false, message: error.message });
    }
};
