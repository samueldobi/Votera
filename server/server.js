require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
<<<<<<< HEAD
<<<<<<< HEAD
=======
const pollRoutes = require('./routes/pollRoutes')
>>>>>>> demo-branch
const cookieParser = require('cookie-parser');
// .dotenv import

// auth route for user authentication before login
<<<<<<< HEAD
<<<<<<< HEAD
const requireAuth = require('./middleware/authMiddleware')
>>>>>>> demo-branch


=======
const {requireAuth, checkUser} = require('./middleware/authMiddleware')
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
  .then(() => app.listen(5000, ()=>{console.log("mongodb connected succesfully")}))
  .catch((err) => console.error("MongoDB connection error:", err));
  
<<<<<<< HEAD:server/index.js

=======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
>>>>>>> demo-branch:server/server.js
// Routes for user registration
app.use(authRoutes);
// Routes for poll functions
app.use(pollRoutes);
// To check if the user is logged in and verified
app.get('/', checkUser, (req, res) => {
  res.json(res.locals.user); // Send the user object as JSON
});
// hdiaogvldkbn
app.get('/', (req, res) => {
  res.send('Server is running');
});
app.get('/checkuser', checkUser, (req, res) => {
  res.status(200).json({success:'the user exists'}) // Send the user object as JSON
});
// To prevent non users from accessing certain pages
app.get('/protectedRoutes', requireAuth, (req,res)=>{
   res.status(200).json({ message: 'Success, User Verified', user: req.user });
}); 