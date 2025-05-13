// Import user schema
const User = require('../models/users');

// Error Functions
const handleErrors =(err)=>{
    // console.log(err)
    console.log(err.message, err.code)
    let errors = {email: '', username:'', password:''}
    // Duplicate email error
    if(err.code ===11000){
        errors.email = "That email is already registered";
        errors.username = "That username is already taken";
        return errors;
    }
    // Validation Errors
    if(err.name === 'ValidationError'){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
            // res.status(400).json({error:"Email is already in use "})
        })
    }
    return errors;
}
module.exports.signup_post = async (req, res)=>{
    // console.log("Request body:", req.body);
    
    // Check if req.body exists and has data
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: "No data received" });
    }

    const{ username, email, password} = req.body;
    try{
        const newUser = await User.create({username,email,password})
        res.status(201).json(newUser);
    }catch(err){
        const errors = handleErrors(err)
        res.status(400).json({errors}); 
        // console.log(errors)
    }
 
}  