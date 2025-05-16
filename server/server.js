const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
// cookie parser plugin
const cookie = require('cookie-parser');
// const userRoutes =  require('./routes/userRoutes');  
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
// .dotenv import
require('dotenv').config();


// I configured  cors to allow  requests from both local development and production frontend
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
// cookier parser 
app.use(cookieParser());

// Connect to mongodb
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
  .then(() => app.listen(5000, ()=>{console.log("server has started on port 5000")}))
  .catch((err) => console.error("MongoDB connection error:", err));
  
  app.get("/", (req, res) => {
    res.send("Hello from backend");
  });
  app.get("/set-cookies", (req, res)=>{
    res.cookie('newUser', false);
    res.cookie('isEmployee', true, { maxAge:10000 * 60, httpOnly: true,
      // secure:true;
    });
    res.send('Votera  cookies are active');
  })
// Routes for user authentication
app.use(authRoutes);
app.get("/work", (req,res)=>{
  res.send('this is a test route')
})