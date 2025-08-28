// Import user schema
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const Poll = require('../models/polldetails')


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
        
        res.status(200).json(poll);
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
        // 
        const contestant = poll.contestants.id(contestantId);
        if (!contestant) return res.status(404).json({ message: "Contestant not found" });
        contestant.votes += 1;
        await poll.save();
        // Emit updated poll data to all connected clients
        io.emit('pollUpdated', { pollId, contestantId, newVoteCount: contestant.votes });
        console.log("Vote counted and update emitted");
        res.status(200).json({ message: "Vote counted successfully" });
    }catch(err){
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
    }
}