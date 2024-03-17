const express = require("express");
const app = express();
const router = express.Router();
const {register, login, updateUser, deleteUser, getUserProfile, sendVerificationMail, verifyEmail, resetPasswordLink, resetPassword, stripeWebhook} = require("../controllers/user.controller");
const {body, param} = require("express-validator");
const {handleValidationError} = require("../utilities/handleValidationError")
const verifyToken = require("../middlewares/authJWT");

// Validators
const userValidator = [
    body('username')
        .trim()
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long")
        .matches(/^[a-zA-Z0-9]+$/).withMessage('Username can only contain alphanumeric characters')
        .escape(),
    body('email', "Invalid email")
        .trim()
        .isEmail()
        .escape(),
    body('firstName')
        .optional({ checkFalsy: true }) 
        .trim()
        .escape(),
    body('lastName')
        .optional({ checkFalsy: true }) 
        .trim()
        .escape(),
    body('dateOfBirth')
        .optional({ checkFalsy: true }) 
        .isISO8601().withMessage("Invalid date format")
        .escape(),
    body('phoneNumber')
        .optional({ checkFalsy: true }) 
        .trim()
        .isMobilePhone().withMessage("Invalid phone number")
        .escape(),
    body('occupation')
        .optional({ checkFalsy: true }) 
        .trim()
        .escape(),
    body('website')
        .optional({ checkFalsy: true }) 
        .trim(),
    body('profileImage')
        .optional({ checkFalsy: true }) 
        .trim()
];

const idValidator = [
    param('id')
        .notEmpty().withMessage("Widget ID is missing")
        .isMongoId().withMessage("Invalid widget ID")
];

const loginValidator = [
    body('login')
        .trim()
        .notEmpty().withMessage("Username can't be empty")
];

const passwordValidator = [
    body('password')
        .isLength({ min: 8 }).withMessage("Password must be atleast 8 characters long")
        .escape()
];

// Register a user
router.route("/").post(userValidator, passwordValidator, handleValidationError, register);

// Authenticate a user
router.route("/login").post( loginValidator, passwordValidator, handleValidationError, login);

// Update user
router.route("/:id").put(verifyToken, idValidator, userValidator, handleValidationError, updateUser);

// Delete user
router.route("/:id").delete(verifyToken, idValidator, handleValidationError, deleteUser);

// Get user
router.route("/profile").get(verifyToken, getUserProfile);

// Verify email
router.route("/verifyEmailRequest").post(verifyToken, loginValidator, handleValidationError, sendVerificationMail);

// Verify email
router.route("/verifyEmail/:id").get(idValidator, handleValidationError, verifyEmail);

// Password reset request
router.route("/resetPassword").post(loginValidator, handleValidationError, resetPasswordLink);

// Reset password
router.route("/resetPassword/:id").post(verifyToken, passwordValidator, idValidator, handleValidationError, resetPassword);

module.exports = router;
