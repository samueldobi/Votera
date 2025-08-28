require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require('cookie-parser');
//initialize allowed origins for cors first before using cors middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://votera.vercel.app'
];
// Web socket setup
const http = require('http');
const server = http.createServer(app);
const {Server } = require('socket.io');
const io = new Server (server,{
    cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
})

const pollRoutes = require('./routes/pollRoutes');
const authRoutes = require('./routes/authRoutes');
// auth route for user authentication before login
const {requireAuth, checkUser} = require('./middleware/authMiddleware')

//handle cors 
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
// make the io accessible to other files
app.set('io', io);
//  Listen for socket connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
});
// Connect to mongodb
const dbURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;
mongoose.connect(dbURI, {
    serverSelectionTimeoutMS: 10000
})
  .then(() => {
        console.log("MongoDB connected successfully");
        server.listen(PORT, () => { 
          console.log(`Server running on port ${PORT}`);
        })
        })
  .catch((err) => console.error("MongoDB connection error:", err));


// Routes for user registration
app.use(authRoutes);
// Routes for poll functions
app.use(pollRoutes);
app.get(/.*/, (req, res, next) => {
  // console.log('Matched all GET routes');
  next();
});
// To prevent non users from accessing certain pages
app.get('/protectedRoutes', requireAuth, (req,res)=>{
   res.status(200).json({ message: 'Success, User Verified', user: req.user });
}); 
app.get('/check-cookies', (req, res) => {
  console.log("Cookies received:", req.cookies);
  res.json({ cookies: req.cookies });
});