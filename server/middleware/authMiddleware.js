const jwt = require('jsonwebtoken')


const secretString = process.env.JWT_SECRET
const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt
    // to check if token exists and is verified\
    if(token){
        jwt.verify(token, secretString, (err, decodedToken)=>{
            if(err){
                // console.log(err.message)
                 return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            }else{
                req.user = decodedToken;
                // console.log(decodedToken);
                next();
            }
        })
    }else{  
         return res.status(401).json({ message: 'Unauthorized: No token found' });
    }
}

module.exports = {requireAuth};