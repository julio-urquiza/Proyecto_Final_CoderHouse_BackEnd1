import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart'
    },
    role: {
        type: String,
        default: "user",
    },
});

export const userModel = mongoose.model("user", UserSchema);
