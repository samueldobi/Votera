const express = require ('express');
const app = express();
const mongoose = require('mongoose');
// const axios =  require('axios');
const cors = require("cors");

// Import user schema
const User = require('./models/users');

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Connect to mongodb

mongoose.connect(dbURI)
  .then(() => app.listen(5000, ()=>{console.log("server has started on port 5000")}))
  .catch((err) => console.error("MongoDB connection error:", err));
  
// set up api
// app.get("/api", (req,res)=>{ 
//     res.json({ users: ["john", "twin"]})
// }) 
// Register a new user
app.post("/api/save-user",  (req, res)=>{  
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
