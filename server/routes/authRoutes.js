const {Router} = require('express');
const authController = require('../controllers/authController');


// initialize auth router
const authRouter = Router();
authRouter.post('/signup', authController.signup_post);
authRouter.post('/login', authController.login_get);
authRouter.post('/logout', authController.logout_post);
module.exports = authRouter;