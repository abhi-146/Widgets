const User = require("../models/user.model");
const {deleteUserWidgets} = require("./widget")
const {sendMail,setPassword, validatePassword} = require("../utilities/utility")
require("dotenv").config();

exports.getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        
        if(!user) {
            throw Error("UserNotFound");
        }
        return user;
    } catch (error) {
        throw error;
    }
}

exports.getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({email: email});
        
        if(!user) {
            throw Error("UserNotFound");
        }
        return user;
    } catch (error) {
        throw error;
    }
}

exports.toAuthJson = async function(user) {

    try {
        let jsonUser =  {
            id: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            dob: user.dob,
            phone: user.phone,
            occupation: user.occupation,
            website: user.website,
            token: user.generateJWT(),
            profileImage: user.profileImage,
            emailVerified: user.emailVerified
        }

        return jsonUser
    } catch (error) {
        throw error;
    }
}

exports.registerUser = async (userData) => {

    try {

        const user = new User(userData);

        // Update fields
        setPassword(user, userData.password);
        user.emailVerified = false;

        // Encode profile image url
        user.profileImage = encodeURIComponent(user.profileImage);
        if(user.website) {
            user.website = encodeURIComponent(user.website);
        }
        await user.save();

        // Send mail
        let verificationLink = process.env.SERVER_URL + "/user/verifyEmail/" + user._id;
        const mailData = {
            from: process.env.MAIL_USER,
            to: user.email,
            subject: "MJ Widgets - Email verification",
            html:"Verify your account<br/><a href='" + verificationLink + "'>Verfiy</a>"
        }

        sendMail(mailData);

        return user;

    } catch(error) {

        throw error;
        
    }
}

exports.loginUser = async (login, password) => {
    try{

        var user = await User.findOne({username: login});

        if(!user) {
            user = await User.findOne({email: login});
        }

        if(user) {
            if(validatePassword(user, password)) {
                return user;
            } else {
                throw { code: 401, message: 'Invalid password!' };
            }
        } else {
            throw { code: 401, message: "User doesn't exist" };
        }
  

    } catch(error) {
        throw error;
    }
}

exports.updateUser = async (userId, newData) => {
    try {

        if(newData.profileImage) {
            newData.profileImage = encodeURIComponent(newData.profileImage);
        }

        if(newData.website) {
            newData.website = encodeURIComponent(newData.website);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });
        
        if(!updatedUser) {
            throw Error("UserNotFound");
        }

        return updatedUser;

    } catch (error) {
        throw error;
    }
}

exports.deleteUser = async (userId) => {
    try {

        // Delete all widgets of user
        deleteUserWidgets(userId);

        const deletedUser = await User.findByIdAndDelete(userId);

        if(!deletedUser) {
            throw Error("UserNotFound");
        }
        return deletedUser;

    } catch (error) {

        throw error;

    }
}

exports.sendVerificationMail = async (login) => {
    try {

        var user = await User.findOne({username: login});

        if(!user) {
            user = await User.findOne({email: login});
        }

        if(user) {
            
            let email = user.email;
            let userId = user._id;

            // Send mail
            let verificationLink = process.env.SERVER_URL + "/user/verifyEmail/" + userId;
            const mailData = {
                from: process.env.MAIL_USER,
                to: email,
                subject: "MJ Widgets - Email verification",
                html:"Verify your account<br/><a href='" + verificationLink + "'>Verfiy</a>"
            }

            sendMail(mailData);
            

        } else {
            throw Error("UserNotFound");
        }

    } catch(error) {
        throw error;
    }
}

exports.verifyEmail = async (userId) => {
    try {

        let user = await this.getUserById(userId);

        user.emailVerified = true;

        await user.save();

    } catch (error) {
        
        throw error;
    }
}

exports.sendResetPasswordMail = async (login) => {
    try {

        var user = await User.findOne({username: login});

        if(!user) {
            user = await User.findOne({email: login});
        }

        if(user) {
            
            let email = user.email;
            let userId = user._id;

            // Generate temporary token
            const token = user.generateJWT(5);
            
            // Send mail
            let pwdResetLink = process.env.CLIENT_URL + "/resetPassword?userId=" + userId + "&token=" + token;
            const mailData = {
                from: process.env.MAIL_USER,
                to: email,
                subject: "MJ Widgets - Password Reset",
                html:"<a href='" + pwdResetLink + "'>Reset Password</a>"
            }

            sendMail(mailData);
            

        } else {
            throw Error("UserNotFound");
        }

    } catch(error) {
        throw error;
    }
}

exports.resetPassword = async (userId, pwd) => {
    try {

        let user = await this.getUserById(userId);
        setPassword(user, pwd);

        await user.save();

    } catch(error) {
        throw error;
    }
}

exports.processStripeWebhook = async (event) => {
    try {
        console.log(event.type)
        switch (event.type) {
         

            case 'invoice.payment_succeeded':
                const data = event.data.object;
            
                let user = await this.getUserByEmail(data.customer_email);

                await user.save();

                break;
            default:
                // console.log(`Unhandled event type ${event.type}`);
        }
    } catch(error) {
        throw error;
    }
}