
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authJWT");
const {getWidgetById, getAllWidgets, addWidget, updateWidget, deleteWidget, serveWidget, previewWidget, getAppfolioDetails, widgetPublishStatus, publishWidget, stripeWebhook} = require("../controllers/widget.controller")
const {body, param} = require("express-validator");
const {handleValidationError} = require("../utilities/handleValidationError")
const {sanitizeWidget} = require("../middlewares/sanitizeInput");
const {verifyWidgetPassword} = require("../middlewares/verifyWidgetPassword");

// validators
const widgetValidator = [
    body('widget.widgetType')
        .notEmpty().withMessage("Widget type can't be empty")
        .trim()
        .escape(),
];

const idValidator = [
    param('id')
        .notEmpty().withMessage("Widget ID is missing")
        .isMongoId().withMessage("Invalid widget ID")
];

const urlValidator = [
    body('url')
        .isURL()
        .withMessage('Please provide a valid URL')
];

/* ----- Common routes for all widgets ----- */

// Get widget publish status
router.route("/publishStatus/:id").post( idValidator, handleValidationError, widgetPublishStatus);

// Publish a widget
router.route("/publish/:id").post( idValidator, handleValidationError, publishWidget);

// Validate a widget
router.route("/validate/:id").post( idValidator, handleValidationError, verifyWidgetPassword, (req,res) => {res.status(200).json({valid: true})});

// Preview widget
router.route('/preview/').post(verifyToken, widgetValidator, handleValidationError, verifyWidgetPassword, previewWidget);

// Get widget by ID
router.route("/:id").get( idValidator, handleValidationError, getWidgetById)

// Get all widgets
router.route("/").get(verifyToken,  handleValidationError, getAllWidgets)

// Create a widget
router.route("/").post(verifyToken, widgetValidator, sanitizeWidget, handleValidationError, addWidget)

// Update a widget
router.route('/:id').put(verifyToken, idValidator, widgetValidator, sanitizeWidget, handleValidationError, updateWidget);

// Delete a widget
router.route('/:id').delete(verifyToken, idValidator, handleValidationError, deleteWidget);

// Serve widget
router.route('/serve/:id').get( idValidator, handleValidationError, verifyWidgetPassword, serveWidget);

// Handle payment
router.route('/webhook').post( express.raw({ type: 'application/json' }), stripeWebhook);

/* ----- Widgets routes ----- */

// Appfolio 
router.route('/appfolio/details').post(urlValidator, handleValidationError, getAppfolioDetails);

module.exports = router;