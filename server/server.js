const express = require ('express');
const app = express();

// Connect to mongodb
const dbURI = "mongodb+srv://Votera-chief:HGNHmeOCS6Cmmpri@votera.sso1xui.mongodb.net/?retryWrites=true&w=majority&appName=Votera";

// set up api
app.get("/api", (req,res)=>{
    res.json({ users: ["john", "twin"]})
})
// Set up server
app.listen(5000, ()=>{console.log("server has started on port 5000")})