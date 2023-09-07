import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: [8, "Password is too weak."],
        //if i fetch the userData, then i'll not get password, because it is select:false
        select: false
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

})

// Define the UserDocument type
export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

export interface UserDocumentId extends UserDocument {
    _id: mongoose.Types.ObjectId
}

// Create the User model
export const User = mongoose.model<UserDocument>("User", schema);