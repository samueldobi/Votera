// Import user schema
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const Poll = require('../models/polldetails')
const sendEmail = require('../utilities/mailer')

// Error Functions
const handleErrors =(err)=>{
    // console.log(err.message, err.code)
    let errors = {email: '', username:'', password:''}
    // Duplicate email error
    if(err.code ===11000){
        const duplicateFields = Object.keys(err.keyPattern || {})
        if(duplicateFields.includes('email')){
            errors.email = "That email is already registered";
        }
        if(duplicateFields.includes('username')){
            errors.username = "That username is already taken";
        }
        return errors;
    }
    // Validation Errors  
    if(err.name === 'ValidationError'){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }
    return errors;
}
// maxAge for the jwt token
const maxAge = 24 * 60 * 60
// secret string variable
const secretString = process.env.JWT_SECRET
// Create JWT Token
const createToken = (id) =>{
    if (!secretString) {
        console.error("ERROR: JWT_SECRET is not defined!");
        throw new Error("JWT secret key is not configured");
    }
    return jwt.sign({id}, secretString, {
        expiresIn: maxAge
    })
}

// Controller Function Exports
module.exports.signup_post = async (req, res)=>{
    // Check if req.body exists and has data
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: "No data received" });
    }

    const{ username, email, password} = req.body;
    // User creation
    try{
        const newUser = await User.create({username,email,password})
        const token = createToken(newUser._id)
        res.cookie('jwt',token, {
            httpOnly: true, 
            maxAge: maxAge * 1000,
            secure: true,     // Only send over HTTPS
            sameSite: 'None'   
        } )
        res.status(201).json({
            message: "signup succesful",
            token,
            user: newUser._id
        });
    }catch(err){
        const errors = handleErrors(err)
        res.status(400).json({errors}); 
    }
    // Send email fron nodemailer
    try{
        await sendEmail(email, 'Welcome to Votera!',`
            <h1>Welcome ${username}!</h1>
            <p>Thanks for signing up to Votera!</p></br>
            <p>You're now part of a community where your vote counts.
            Start exploring polls, cast your vote, or create your own. </p>
             <p>Start a poll  <a href = "https://votera.vercel.app/login">Now</a></p>
            `
        )  
    }catch(err){
        console.log(err)
    }
 
}  
module.exports.login_get = async (req, res)=>{
    const {email, password} = req.body;
    console.log('=== LOGIN ATTEMPT ===');
console.log('Request body received:', req.body);
    try{
        const validUser = await User.findOne({email:email})
        if(!validUser){
            return res.status(400).json({error:'incorrect email or password'})
        }
        const isMatch = await validUser.comparePassword(password)
        if(!isMatch){
            return res.status(400).json({error:'incorrect email or password'})
        }
        const userToken = createToken(validUser._id)
        
        res.cookie('jwt',userToken, {
            httpOnly: true, 
            maxAge: maxAge * 1000,
            secure: true,           // Only send over HTTPS
            sameSite: 'None'   // Helps prevent CSRF 
        })
    res.status(200).json({ 
        message: "Login successful", 
        token: userToken,
        user: validUser._id });
 
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong, check well Please try again'})
    }
}
module.exports.logout_post = (req, res)=>{
    res.cookie('jwt', '', {
        httpOnly: true, 
        secure: true,
        sameSite: 'None',
        maxAge: 1,
    })
    res.status(200).json({success:'User logged out succesfully'})
}
module.exports.get_current_user =  async (req, res)=>{
    const user = res.locals.user
    console.log(user)
    if(user){
        res.json({
            success:true,
            username: user.username,
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    }else{
        res.json({
            success:false,
            message:'not working',
            user:null
        });
    }
    console.log(user)
}
// Poll details routes
module.exports.save_poll_details = async ( req, res)=>{
  
    try{
        const pollData = req.body
        const newPollData = new Poll(pollData);
        const updatedPoll = await newPollData.save();
   

      
        res.status(201).json(updatedPoll)
    }catch(err){
        console.error('Error saving poll:', err);
        res.status(500).json({ error: 'Failed to save poll' });
    }
}
module.exports.get_poll_details = async ( req,res) =>{
    try {
        const { id } = req.params; // or req.query.id if using query params
        const poll = await Poll.findById(id);
        if (!poll) {
            return res.status(404).json({ error: 'Poll not found' });
        }
         const now = new Date();
        const isVotingClosed = now > poll.endDate; // Check if voting time has ended
        res.status(200).json({poll, isVotingClosed});
         console.log(poll)
    } catch (err) {
        console.error('Error fetching poll:', err);
        res.status(500).json({ error: 'Failed to fetch poll' });
    }
    
}
module.exports.add_vote =  async(req,res)=>{
    console.log("Vote route hit");
    // io for websocket
    const io = req.app.get('io');
    const {pollId, contestantId} = req.body;
    try{
        const poll = await Poll.findById(pollId);
        if (!poll) return res.status(404).json({ message: "Poll not found" });
        // Check if voting time has ended
        const now = new Date();
        if(now > poll.endDate){
            console.log("Voting for this poll  has ended");
            return res.status(400).json({message: "Voting for this poll  has ended"})
        }
        const contestant = poll.contestants.id(contestantId);
        if (!contestant) return res.status(404).json({ message: "Contestant not found" });
        contestant.votes += 1;
        await poll.save();
        // Emit updated poll data to all connected clients
        io.emit('pollUpdated', { pollId, contestantId, newVoteCount: contestant.votes });

        res.status(200).json({ message: "Vote counted successfully" });
    }catch(err){
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
    }
}