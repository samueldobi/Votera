const mongoose = require('mongoose');
// Package to validate email
const {isEmail} = require('validator');
// import bcrypt for hashing
const bcrypt = require('bcrypt');
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
        minLength: [6, 'Minimum password length is 6 characters'],
      },
    
      createdAt: {
        type: Date,
        default: Date.now,
      }
})
// Mongoose hook to hash the password before it is saved to the database
userSchema.pre('save', async function(next){
  const userSalt = await bcrypt.genSalt();
  this.password  = await bcrypt.hash(this.password, userSalt)
  next();
})
const User = mongoose.model('User', userSchema);
module.exports = User;