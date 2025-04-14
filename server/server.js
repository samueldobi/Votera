const express = require ('express');
const app = express();

// set up api
app.get("/api", (req,res)=>{
    res.json({ users: ["john", "twin"]})
})
// Set up server
app.listen(5000, ()=>{console.log("server has started on port 5000")})