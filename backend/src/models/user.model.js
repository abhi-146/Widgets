const mongoose  = require('mongoose');
const jwt = require('jsonwebtoken');
require("dotenv").config()

// Define schema for user
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username can't be blank"],
        unique: [true, "Username already exists"],
        trim: true,
        minLength: [3, "Username must be atleast 3 characters long"],
        match: [/^[a-zA-Z0-9]+$/, "Username can only contain alphanumeric characters"],
        index: true
    },
    email: {
        type: String,
        required: [true, "Email can't be blank"],
        unique: [true, "Email already exists"],
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
        index: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    dob: Date,
    phone: {
        type: Number,
        trim: true
    },
    occupation: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true,
        // match: [/(^$)|(^https?:\/\/)?(www\.)?[a-zA-Z0-9]+(\.[a-zA-Z]{2,})+(\.[a-zA-Z]{2,})?/, "Please enter a valid URL"]
    },
    profileImage: {
        type: String,
        default: 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
    },
    hash: String,
    salt: String,
    emailVerified: Boolean,
    widgets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "widget"
    }]
}, {timestamps: true});

UserSchema.methods.generateJWT = function(expiryInMinutes = parseInt(process.env.TOKEN_EXPIRY)) {
    var today = new Date();
    var exp = new Date(today.getTime() + expiryInMinutes * 60000); 

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: Math.floor(exp.getTime() / 1000),
    }, process.env.ACCESS_TOKEN_SECRET);
};

// Create model for users
const User = mongoose.model('user', UserSchema);

module.exports = User;