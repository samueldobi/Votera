const express = require('express');
// Import user schema
const User = require('../models/users');
const register = express.Router(); 

// Register a new user
register.post("/api/save-user",  (req, res)=>{  
    console.log("Request body:", req.body);
    
    // Check if req.body exists and has data
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: "No data received" });
    }

    const{ username, email, password} = req.body;
    const user = new User({
        username,
        email,      
        password
    })
    user.save()
    .then((result)=>{   
        res.status(201).send(result);
    }).catch((err)=>{
        res.status(500).send({ error: "Failed to save user" });
    });
})
module.exports = register;