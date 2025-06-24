const {Router} = require('express');
const authController = require('../controllers/authController');
const { checkUser } = require('../middleware/authMiddleware');



// initialize auth router
const authRouter = Router();
authRouter.post('/signup', authController.signup_post);
authRouter.post('/login', authController.login_get);
authRouter.post('/logout', authController.logout_post);
authRouter.get('/getuser',checkUser, authController.get_current_user);
// authRouter.get('/getuser', (req, res, next) => {
//   console.log('✅ checkUser middleware dummy called');
//   next();
// }, authController.get_current_user);
authRouter.post('/savepolldetails', authController.save_poll_details);
authRouter.get('/getpolldetails/:id', authController.get_poll_details);
authRouter.post('/vote', authController.add_vote);
module.exports = authRouter;