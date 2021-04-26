const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const auth = async (req, res, next) => {
    try {   
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodeToken = jwt.verify(token, 'userToken');
        const user = User.findOne({_id:decodeToken._id});
        if(!user){
            throw 'user not found';
        }
        req.token = token;
        req.user = user;
        next();
    } 
    catch (err) {
        res.status(401).send({error:'Please authenticate'});
    }
}
module.exports = auth;