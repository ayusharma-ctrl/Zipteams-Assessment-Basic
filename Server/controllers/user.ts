import bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import { User } from "../models/userModel.js"
import { sendToken } from "../utils/sendToken.js"

// 1
export const addNewUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password }: { name: string, email: string, password: string } = req.body; // destruct tha data from body
        if (!email || !name || !password) { // validation check
            return res.status(404).json({
                success: false,
                message: "Please enter all the details before submitting!"
            })
        }
        // find user details with entered email
        let user = await User.findOne({ email })
        if (user) { // validation check
            return res.status(404).json({
                success: false,
                message: "User is already exist!"
            })
        }
        // encrypt password before saving to db, hashing + saltrounds
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        sendToken(user, res, "Signed Up Successfully! Try to access your account.", 201)
    }
    catch (e: any) {
        res.status(500).json({ success: false, message: e.message })
    }
}

// 2
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password }: { email: string, password: string } = req.body;
        // by default we don't select encrypted password from db
        const user = await User.findOne({ email }).select("+password")
        // validation check
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid username!"
            })
        }
        // comparing password
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        // password validation
        if (!isPasswordCorrect) {
            return res.status(404).json({
                success: false,
                message: "Invalid username or password!"
            })
        }
        // after successful  validation, let the user login
        sendToken(user, res, `Welcome back ${user.name}!`, 200);
    }
    catch (e: any) {
        res.status(500).json({ success: false, message: e.message });
    }
}

// 3
export const getMyProfile = (req: Request, res: Response) => {
    try {
        res.json({
            success: true,
            user: req.user! // previously we have saved user info in req in middleware, so we can access it from there,
        })
    }
    catch (e: any) {
        res.status(500).json({ success: false, message: e.message });
    }
}

// 4
export const logout = (req: Request, res: Response) => {
    try { // update the token
        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
        }).json({
            success: true,
            message: "Logged Out!"
        })
    }
    catch (e: any) {
        res.status(500).json({ success: false, message: e.message });
    }
}

// 5
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { _id } = req.user!;
        const user = await User.findById(_id); // finding user data in db
        if (!user) { // validation check
            return res.status(404).json({
                success: false,
                message: "No such user Found!"
            })
        }
        await user.deleteOne(); // deleting user data from db and instant logout
        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
        }).json({
            success: true,
            message: "Deleted!"
        })
    }
    catch (e: any) {
        res.status(500).json({ success: false, message: e.message });
    }
}

// 6
export const updatePassword = async (req: Request, res: Response) => {
    try {
        const { oldPassword, newPassword }: { oldPassword: string, newPassword: string } = req.body; // read input from body
        const { email } = req.user!; // only authenticated users can update password, so we aleady have user info
        const user = await User.findOne({ email }).select("+password") // try to get the password of this user from db
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Something went wrong"
            })
        }
        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password) // comparing passwords
        const isNewPasswordCorrect = await bcrypt.compare(newPassword, user.password)
        if (!oldPassword || !newPassword) { // validation check
            return res.status(404).json({
                success: false,
                message: "Please enter all the details before submitting!"
            })
        }

        if (!isOldPasswordCorrect) {
            return res.status(404).json({
                success: false,
                message: "Old Password is invalid!"
            })
        }
        if (isNewPasswordCorrect) {
            return res.status(404).json({
                success: false,
                message: "New Password should be unique!"
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10); // encrypting new password before saving to db
        user.password = hashedPassword;
        await user.save();
        res.json({
            success: true,
            message: "Password is updated!"
        })
    }
    catch (e: any) {
        res.status(500).json({ success: false, message: e.message });
    }
}

// 7
export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email, oldPassword, newPassword }: { email: string, oldPassword: string, newPassword: string } = req.body;
        if (!email || !oldPassword || !newPassword) { // validation check
            return res.status(404).json({
                success: false,
                message: "Please enter all the details before submitting!"
            })
        }
        const user = await User.findOne({ email }).select("+password") // try to get the password of this user from db
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Something went wrong"
            })
        }
        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password) // comparing passwords
        const isNewPasswordCorrect = await bcrypt.compare(newPassword, user.password)

        if (!isOldPasswordCorrect) {
            return res.status(404).json({
                success: false,
                message: "Old Password is invalid!"
            })
        }
        if (isNewPasswordCorrect) {
            return res.status(404).json({
                success: false,
                message: "New Password should be unique!"
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10); // encrypting new password before saving to db
        user.password = hashedPassword;
        await user.save();
        res.json({
            success: true,
            message: "Password is changed!"
        })

    }
    catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}