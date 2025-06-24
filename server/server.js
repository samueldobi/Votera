require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');

const pollRoutes = require('./routes/pollRoutes')

const cookieParser = require('cookie-parser');
// .dotenv import

// auth route for user authentication before login
const {requireAuth, checkUser} = require('./middleware/authMiddleware')

//attempt to fix cors issue
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://votera.vercel.app'
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
// 
app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
// cookier parser 
app.use(cookieParser());


// Connect to mongodb
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, {
    serverSelectionTimeoutMS: 10000
})
  .then(() => app.listen(5000, ()=>{console.log("mongodb connected succesfully")}))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 

// Routes for user registration
app.use(authRoutes);
// Routes for poll functions
app.use(pollRoutes);
// checkUser
// app.use('*', checkUser)
app.get(/.*/, (req, res, next) => {
  // console.log('Matched all GET routes');
  next();
});
// To prevent non users from accessing certain pages
app.get('/protectedRoutes', requireAuth, (req,res)=>{
   res.status(200).json({ message: 'Success, User Verified', user: req.user });
}); 
app.get('/api/test-auth', requireAuth, (req, res) => {
    res.json({ 
        message: 'Auth working!', 
        user: req.user,
        timestamp: new Date().toISOString()
    });
});
app.get('/check-cookies', (req, res) => {
  console.log("Cookies received:", req.cookies);
  res.json({ cookies: req.cookies });
});