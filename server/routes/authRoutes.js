const {Router} = require('express');
const authController = require('../controllers/authController');
const { checkUser } = require('../middleware/authMiddleware');




// initialize auth router
const authRouter = Router();
authRouter.post('/signup', authController.signup_post);
authRouter.post('/login', authController.login_get);
authRouter.post('/logout', authController.logout_post);
authRouter.get('/getuser',checkUser, authController.get_current_user);
module.exports = authRouter;