const Poll = require('../models/pollModel');

const checkVotingPeriod = async (req, res, next) =>{
    const pollId = req.body;
    try{
        const poll = await Poll.findById(pollId);
          // Check if voting time has ended
        const now = new Date();
        if(now > poll.endDate){
            console.log("Voting for this poll  has ended");
            return res.status(400).json({message: "Voting for this poll  has ended"})
        }
        next();
    }catch(err){
        console.error('Error checking voting period:', err);
        res.status(500).json({ error: 'Failed to check voting period' });
    }
}
module.exports = {checkVotingPeriod};