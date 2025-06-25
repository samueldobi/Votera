const jwt = require('jsonwebtoken')
const User = require('../models/users');


const secretString = process.env.JWT_SECRET
const requireAuth = (req, res, next)=>{
    let token = req.cookies.jwt
    const authHeader = req.headers.authorization
    if(!token && authHeader &&  authHeader.startsWith('Bearer')){
            token = authHeader.split(' ')[1];
    }
        console.log('Final token found:', token ? 'YES' : 'NO');

    // to check if token exists and is verified
    if(token){
        jwt.verify(token, secretString, (err, decodedToken)=>{
            if(err){
                 return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            }else{
                req.user = decodedToken;
                next();
            }
        })
    }else{  
         return res.status(401).json({ message: 'Unauthorized: No token found' });
    }
}

// Check current user
const checkUser = async  (req, res, next) =>{
    let cookieToken = req.cookies.jwt
    const authHeader = req.headers.authorization
    const token = (authHeader?.startsWith('Bearer ') && authHeader.split(' ')[1]) || cookieToken;
    if(token){
        jwt.verify(token, secretString, async (err, decodedToken)=>{
            if(err){
                console.log(err.message)
                res.locals.user = null
                return next();
            }else{
                 try {

                    const userId = decodedToken.id; 

                    
                    let user = await User.findById(userId);
 
                    res.locals.user = user;
                    next();
                } catch (dbError) {
                    console.error('Database error:', dbError);
                    res.locals.user = null;
                    next();
                }
            }
        })
    }else{
        res.locals.user = null;
        next();
    }
}

module.exports = {requireAuth, checkUser};