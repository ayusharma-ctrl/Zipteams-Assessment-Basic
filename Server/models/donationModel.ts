import mongoose from "mongoose";

const schema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    amount: {
        type: Number,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

})

// Define the DonationDocument type based on the model
export interface DonationDocument extends Document {
    description: string;
    user: mongoose.Types.ObjectId;
    amount: number;
    createdAt: Date;
}

// Create the Donation model
export const Donation = mongoose.model<DonationDocument>('Donation', schema);