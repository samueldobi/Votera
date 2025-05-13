const mongoose = require('mongoose');
// Package to validate email
const {isEmail} = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required. Please enter your username.'],
        unique: true,
        lowercase:true,
        trim: true,
      }, 
    
      email: {
        type: String,
        required: [true, 'Email is required. Please enter a valid email address.'],
        unique: true,
        lowercase: true,
        trim: true,
        validate:[isEmail,'Please enter a valid email']
      },
    
      password: {
        type: String,
        required: [true, 'Password is required.'],
        minLength:6,
      },
    
      createdAt: {
        type: Date,
        default: Date.now,
      }
})

const User = mongoose.model('User', userSchema);
module.exports = User;