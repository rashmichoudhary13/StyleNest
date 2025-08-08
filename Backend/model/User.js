import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkUserId: {
        type: String,
        unique: true,
    },
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
    },
},
{ timestamps: true}
);

const userModel = mongoose.model('users', userSchema);

export default userModel;