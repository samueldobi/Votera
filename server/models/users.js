const mongoose = require('mongoose');
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
      },
    
      password: {
        type: String,
        required: [true, 'Password is required.']
      },
    
      createdAt: {
        type: Date,
        default: Date.now,
      }
})

const User = mongoose.model('User', userSchema);
module.exports = User;