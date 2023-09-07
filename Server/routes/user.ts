import express from 'express';
import { addNewUser,  deleteUser, forgotPassword, getMyProfile, login, logout, updatePassword } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

//creating a router
const router = express.Router();

//api to create new user
router.post("/new", addNewUser)

//api to login
router.post("/login", login)

//api to logout
router.get("/logout", logout)

//api to get user's profile
router.get("/me", isAuthenticated, getMyProfile)

//api to update user's password
router.put("/updatePassword", isAuthenticated, updatePassword)

//api to delete user account
router.delete("/delete", isAuthenticated, deleteUser)

//api to forget password - we will send email
router.post("/forgotPassword", forgotPassword)


export default router;