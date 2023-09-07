import express from 'express';
import { addNewDonation, getMyDonations, isSpecialUser } from '../controllers/donation.js';
import { isAuthenticated } from '../middlewares/auth.js';

//creating a router
const router = express.Router();

// API to get user's donations and add a new donation
router.route("/donations").get(isAuthenticated, getMyDonations).post(isAuthenticated, addNewDonation);

// API to send special message
router.get("/thankyou", isAuthenticated, isSpecialUser)


export default router;