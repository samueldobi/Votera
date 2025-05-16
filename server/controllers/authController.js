// Import user schema
const User = require('../models/users');
const jwt = require('jsonwebtoken');

// Error Functions
const handleErrors =(err)=>{
    console.log(err.message, err.code)
    let errors = {email: '', username:'', password:''}
    // Duplicate email error
    if(err.code ===11000){
        const duplicateFields = Object.keys(err.keyPattern || {})
        if(duplicateFields.includes('email')){
            errors.email = "That email is already registered";
        }
        if(duplicateFields.includes('username')){
            errors.username = "That username is already taken";
        }
        return errors;
    }
    // Validation Errors  
    if(err.name === 'ValidationError'){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
        // Object.keys(err.errors).forEach((key) => {
        //     errors[key] = err.errors[key].properties?.message || err.errors[key].message;
        //   });
        
    }
    return errors;
}
// maxAge for the jwt token
const maxAge = 24 * 60 * 60
// secret string variable
const secretString = process.env.JWT_SECRET
// Create JWT Token
const createToken = (id) =>{
    if (!secretString) {
        console.error("ERROR: JWT_SECRET is not defined!");
        throw new Error("JWT secret key is not configured");
    }
    return jwt.sign({id}, secretString, {
        expiresIn: maxAge
    })
}

// Controller Function Exports
module.exports.signup_post = async (req, res)=>{
    // console.log("Request body:", req.body);
    
    // Check if req.body exists and has data
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: "No data received" });
    }

    const{ username, email, password} = req.body;
    try{
        const newUser = await User.create({username,email,password})
        const token = createToken(newUser._id)
        res.cookie('jwt',token, {
            httpOnly: true, 
            maxAge: maxAge * 1000,
            // secure: true,           // Only send over HTTPS
            // sameSite: 'Strict'   // Helps prevent CSRF 
        } )
        res.status(201).json({user: newUser._id});
    }catch(err){
        const errors = handleErrors(err)
        res.status(400).json({errors}); 
    }
 
}  