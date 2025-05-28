require('dotenv').config();
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
  

app.use(authRoutes);
