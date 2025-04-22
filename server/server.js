const express = require ('express');
const app = express();
const mongoose = require('mongoose');

// Connect to mongodb
const dbURI = "";

// set up api
app.get("/api", (req,res)=>{
    res.json({ users: ["john", "twin", "hello"]})
})
// Set up server
app.listen(5000, ()=>{console.log("server has started on port 5000")})