import jwt from 'jsonwebtoken'
import { Response } from 'express'
import { UserDocumentId } from '../models/userModel'

export const sendToken = (user: UserDocumentId, res: Response, message: string, statusCode = 200) => {
    // create a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000,
    })
    // construct user data obj
    const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
    }
    // send the final response
    res.status(statusCode).cookie("token", token, {
        httpOnly: false,
        expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
    }).json({
        success: true,
        message,
        user: userData,
    })
}