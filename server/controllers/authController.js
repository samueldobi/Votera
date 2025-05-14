// Import user schema
const User = require('../models/users');

// Error Functions
const handleErrors =(err)=>{
    console.log(err.errors)
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
    }
 
}  