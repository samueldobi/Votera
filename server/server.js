const express = require ('express');
const app = express();
const mongoose = require('mongoose');
// const axios =  require('axios');
const cors = require("cors");

// Import user schema
const User = require('./models/users');

// Middleware
app.use(cors());

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
    const user = new User({
        username: 'king',
        email:'harry@gmail.com',
        password:'myguy'
    })
    user.save()
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    });
})
