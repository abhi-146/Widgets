const { toAuthJson, registerUser, loginUser, updateUser, deleteUser, verifyEmail, sendVerificationMail, sendResetPasswordMail, resetPassword } = require("../services/user");;
require("dotenv").config()

exports.register = async (req, res) => {
    try {
        const userData = req.body;

        const savedUser = await registerUser(userData);
    
        res.status(201).json({ message: 'User registered successfully', user: await toAuthJson(savedUser) });
  
    } catch (error) {
        console.error(error);

        if(error.name == "MongoServerError" && error.code == 11000) {
            
            res.status(400).json(`${Object.keys(error.keyValue)[0]} already exists`);
        } else if(error.name == "ValidationError") {
            
            res.status(400).json(error.message);
        } else {
            
            res.status(500).json('Internal server error: ' + error);
        }
    }
}

exports.login = async(req, res) => {
    try {
    
        const {login, password} = req.body;

        var user = await loginUser(login, password);

        res.status(200).json({user: await toAuthJson(user) });
  
    } catch (error) {
        console.error(error);

        if(error.code === 401) {
            return res.status(401).json(error.message);
        } else {
            res.status(500).json('Internal server error: ' + error);
        }
        
    }
}

exports.updateUser = async(req, res) => {
    try{

        const userId = req.params.id;
        const userData = req.body;

        const updatedUser = await updateUser(userId, userData);
    
        res.status(200).json({ message: 'User updated successfully', user: await toAuthJson(updatedUser) });

    } catch(error) {
        console.error(error);

        if(error.name == "MongoServerError" && error.code == 11000) {
            
            res.status(400).json(`${Object.keys(error.keyValue)[0]} already exists`);
        } else if(error.name == "ValidationError") {
            
            res.status(400).json(error.message);
        } else {
            
            res.status(500).json('Internal server error: ' + error);
        }
    }
}

exports.deleteUser = async(req, res) => {
    try{

        const userId = req.params.id;

        const deletedUser = await deleteUser(userId);
    
        res.status(200).json({ message: 'User deleted successfully', user: await toAuthJson(deletedUser) });

    } catch(error) {
        console.log(error);

        if(error.message === "UserNotFound") {
            return res.status(400).json("User not found");
        } else {
            res.status(500).json('Internal server error: ' + error);
        }
    }
}

exports.getUserProfile = async(req, res) => {
    try{

        let currUser = req.user;

        res.status(200).json({ user: await toAuthJson(currUser) });

    } catch(error) {
        console.log(error);

        res.status(500).json('Internal server error: ' + error);
    }
}

exports.sendVerificationMail = async (req, res) => {
    try {

       let login = req.body.login;

       await sendVerificationMail(login);

       res.status(200).json("Verification mail sent");

    } catch(error) {
        if(error.message === "UserNotFound") {
            res.status(404).json('User not found');
        } else {
            res.status(500).json('Internal server error: ' + error);
        }
    }
}

exports.verifyEmail = async(req, res) => {
    try{

        let id = req.params.id;

        await verifyEmail(id);

        res.status(200).json("Email verified successfully!");
        

    } catch(error) {
        console.log(error.message);

        if(error.message === "UserNotFound") {
            res.status(404).json('User not found');
        } else {
            res.status(500).json('Internal server error: ' + error);
        }
        
    }
}

exports.resetPasswordLink = async (req, res) => {
    try {

       let login = req.body.login;

       await sendResetPasswordMail(login);

       res.status(200).json("Password reset link sent");

    } catch(error) {
        if(error.message === "UserNotFound") {
            res.status(404).json('User not found');
        } else {
            res.status(500).json('Internal server error: ' + error);
        }
    }
}

exports.resetPassword = async (req, res) => {
    try {
    
        let userId = req.params.id;
        let password = req.body.password;

        await resetPassword(userId, password);

        res.status(200).json("Password changed successfully!");

    } catch(error) {
        if(error.message === "UserNotFound") {
            res.status(404).json('User not found');
        } else {
            res.status(500).json('Internal server error: ' + error);
        }
    }
}

