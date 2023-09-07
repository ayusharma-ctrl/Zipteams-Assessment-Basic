import { Request, Response } from 'express';
import { Donation, DonationDocument } from "../models/donationModel.js"

// 1
export const addNewDonation = async (req: Request, res: Response) => {
    try {
        const { description, amount }: { description: string, amount: number } = req.body; // destruct tha data from body
        if (!description || !amount) { // validation check
            return res.status(404).json({
                success: false,
                message: "Please enter all the details before submitting!"
            })
        }
        // destruct user id
        const { _id } = req.user!; // ! to tell TypeScript it's not undefined
        // create new Donation
        const donation = await Donation.create({
            description,
            amount,
            user: _id
        })

        // send the response
        res.status(200).json({
            success: true,
            message: "Thanks for the donation!",
            donation: donation
        })
    }
    catch (e:any) {
        res.status(500).json({ success: false, message: e.message })
    }
}

// 2
export const getMyDonations = async (req: Request, res: Response) => {
    try {
        const { _id } = req.user!; // ! to tell TypeScript it's not undefined
        // first find all the donations of a user, then Sort by createdAt in descending order (most recent first)
        const myDonations: DonationDocument[] = await Donation.find({ user: _id }).sort({ createdAt: -1 })
        // validation check
        if (!myDonations) {
            return res.status(404).json({
                success: false,
                message: "No Donations!"
            })
        }
        // send the response
        res.status(200).json({
            success: true,
            donation: myDonations
        })
    }
    catch (e:any) {
        res.status(500).json({ success: false, message: e.message });
    }
}

// 3
export const isSpecialUser = async (req: Request, res: Response) => {
    try {
        const { _id } = req.user!; // ! to tell TypeScript it's not undefined
        // Use the $count aggregation stage to directly count donations by the user
        const donationCount = await Donation.aggregate([
            {
                $match: {
                    user: _id, // Match donations by user ID
                },
            },
            {
                $count: 'count', // Count the number of donations
            },
        ]);

        // define the variables based on the donation count
        const count = donationCount.length > 0 ? donationCount[0].count : 0;
        const specialMessage = count >= 2 ? 'Thank You so much for your donations. May god bless you.' : 'Please donate more to help the society.';

        // send the response
        res.status(200).json({
            success: true,
            message: specialMessage,
            totalDonations: count
        })
    }
    catch (e:any) {
        res.status(500).json({ success: false, message: e.message });
    }
}