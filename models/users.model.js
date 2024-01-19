const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    username: {
        type: String,
        unique: true,
        default: null,
    },
    gender: {
        type: String,
        required: true,
        // enum: ["male", "female"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        default: null,
    },
    cart: {
        type: [],
        default: [],
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
