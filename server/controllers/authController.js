// Import user schema
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const Poll = require('../models/polldetails')

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
module.exports.login_get = async (req, res)=>{
    const {email, password} = req.body;
    // console.log(email, password) 
    try{
        const validUser = await User.findOne({email:email})
        if(!validUser){
            return res.status(400).json({error:'incorrect email or password'})
        }
        const isMatch = await validUser.comparePassword(password)
        if(!isMatch){
            return res.status(400).json({error:'incorrect email or password'})
        }
        const userToken = createToken(validUser._id)
        
        res.cookie('jwt',userToken, {
            httpOnly: true, 
            maxAge: maxAge * 1000,
            // secure: true,           // Only send over HTTPS
            // sameSite: 'Strict'   // Helps prevent CSRF 
        })
    res.status(200).json({ message: "Login successful", user: validUser._id });
 
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong, Please try again'})
    }
}
module.exports.logout_post = (req, res)=>{
    res.cookie('jwt', '', {
        httpOnly: true, 
        // secure: true,
        // sameSite: 'None',
        maxAge: 1,
    })
    res.status(200).json({success:'User logged out succesfully'})
}
module.exports.get_current_user = (req, res)=>{
        if (res.locals.user) {
        res.json({ 
            success: true, 
            user: {
                id: res.locals.user._id,
                username: res.locals.user.username,
                email: res.locals.user.email
            }
        });
    } else {
        res.json({ success: false, user: null });
    }
}
module.exports.save_poll_details = async ( req, res)=>{
    console.log(req.body);
    try{
        const pollData = req.body
        const newPollData = new Poll(pollData);
        const updatedPoll = await newPollData.save();
        res.status(201).json(updatedPoll)
    }catch(err){
        console.error('Error saving poll:', err);
        res.status(500).json({ error: 'Failed to save poll' });
    }
}
module.exports.get_poll_details = async ( req,res) =>{
    console.log(req.body)
    try{
        // 
    }catch(err){
        console.log(err)
    }
}