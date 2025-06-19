const jwt = require('jsonwebtoken')
const User = require('../models/users');


const secretString = process.env.JWT_SECRET
const requireAuth = (req, res, next)=>{
    let token = req.cookies.jwt
    if(!token && req.headers.authorization){
        const authHeader = req.headers.authorization
        // check if it starts with bearer
        if(authHeader.startsWith('Bearer')){
            token = authHeader.split('')[1];
        }
    }
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
const checkUser =  (req, res, next) =>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, secretString, async (err, decodedToken)=>{
            if(err){
                res.locals.user = null;
                next();
            }else{
                // req.user = decodedToken;
                // console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                // console.log(user)
                res.locals.user = user;
                next();
            }
        })
    }else{  
        res.locals.user = null;
        next();
    }
}

module.exports = {requireAuth, checkUser};