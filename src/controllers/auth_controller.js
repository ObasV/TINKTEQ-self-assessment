const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/user_model');

async function httpLogin(req, res){
    try{
        const {email, password} = req.body;

        //find user by email
        const user = await Users.findOne({email});
        if (!user){
            return res.status(401).json({message: 'Invalid email or password'});
        }

        //validate password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(401).json({message: "Invalid email or password"});
        }

        // create JWT payload
        const payload = {userId : user._id};

        // Generate JWT with secret key 
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        });

        //Respond with JWT
        res.json({token});

    }catch (error){
        console.error(error);
        res.status(500).json({message:"Server error"})
    }
}

module.exports = {
    httpLogin
}