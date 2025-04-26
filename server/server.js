const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
// .dotenv import
require('dotenv').config();

// Import user schema
const User = require('./models/users');
// configure cors to allow  requests from both local development and production frontend
const corsOptions = {
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://votera.vercel.app'
    ],
    credentials: true
  };
// Middleware
app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Connect to mongodb
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
  .then(() => app.listen(5000, ()=>{console.log("server has started on port 5000")}))
  .catch((err) => console.error("MongoDB connection error:", err));
  
  app.get("/", (req, res) => {
    res.send("Hello from backend");
  });
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
