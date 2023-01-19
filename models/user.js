const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//creating user schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max:20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max:20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        strict: true
    },
    address: {
        type: String,
    },
    userType:{
        type: String,
        default: 'USER',
        enum: ['USER', 'ADMIN'],
        uppercase: true,
        strict: true
    },
    phoneNumber: { 
        type: Number,
        required: true
    },
    profilePicture: { 
        type: String 
    },

}, 
{ timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;