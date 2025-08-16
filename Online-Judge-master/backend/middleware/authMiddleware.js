const jwt =require("jsonwebtoken")
const dotenv = require("dotenv");
const User = require('../models/User');

dotenv.config();


const requireAuth = function(req , res , next){
    const token = req.cookies.jwt;
    console.log("token is",token);

    // check if token exists
    if(token){
        jwt.verify(token ,process.env.SECRET_KEY , (err , decodedToken) =>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }
            else{
                console.log(decodedToken);
                next();
            }
        });
    }
    else{

        res.redirect('/login');
    }
}

const requireAdmin = async function(req, res, next) {
    const token = req.cookies.jwt;
    
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decodedToken.id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Admin access required' });
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports={requireAuth, requireAdmin};