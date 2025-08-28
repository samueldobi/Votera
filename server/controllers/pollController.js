// Import user schema
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const Poll = require('../models/polldetails')


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
    } catch (err) {
        console.error('Error fetching poll:', err);
        res.status(500).json({ error: 'Failed to fetch poll' });
    }
}
module.exports.vote_for_contestant = async (req,res)=>{
    console.log('hello')
}