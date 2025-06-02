require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
<<<<<<< HEAD
const cookieParser = require('cookie-parser');
// .dotenv import

// auth route for user authentication before login
<<<<<<< HEAD
const requireAuth = require('./middleware/authMiddleware')
>>>>>>> demo-branch




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
  

// Routes for user registration
app.get('/', (req,res)=>{
  res.send('You are at the home page')
})
app.use(authRoutes);
app.get('/protectedRoutes', requireAuth, (req,res)=>{
   res.status(200).json({ message: 'Success, User Verified', user: req.user });
});