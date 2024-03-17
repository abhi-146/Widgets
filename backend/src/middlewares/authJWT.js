const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config()

const verifyToken = (req, res, next) => {

    if(req.headers && req.headers.authorization) {
       
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1]; // Split Bearer from authHeader -> "Bearer <token>"

        if(token == null) {
            return res.status(403).send("Invalid JWT token");
        } else {
            
            // verify the token
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
                if(err) {
                    return res.status(403).send("Invalid JWT token");
                } else {
                    
                    User.findOne({_id: decode.id})
                    .then((user) => {
                        if(user) {
                            req.user = user;
                            next();
                        } else {
                            return res.status(403).send("Invalid JWT token - User doesn't exist");
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        return res.status(403).send("Invalid JWT token - User doesn't exist");
                    })
                } 
                
            })
        } 

    } else {
        return res.status(403).send("Invalid JWT token");
    }

};

module.exports = verifyToken;