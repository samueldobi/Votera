const {Router} = require('express');
const pollController = require('../controllers/pollController');

// initialize router
const pollRouter = Router();
// connect routes
pollRouter.post('/savepolldetails', pollController.save_poll_details);
pollRouter.get('/getpolldetails/:id', pollController.get_poll_details);
pollRouter.get('/poll/:pollid/vote/:contestantId', pollController.vote_for_contestant);
module.exports = pollRouter;