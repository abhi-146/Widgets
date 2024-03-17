const router = require("express").Router();
const {body, param} = require("express-validator");
const {getFileById, getAllFiles, addFile, updateFile, deleteFile} = require("../controllers/file.controller")
const {handleValidationError} = require("../utilities/handleValidationError")
const {getMulter} = require("../utilities/utility");
const verifyToken = require("../middlewares/authJWT");
const {sanitizeWidget} = require("../middlewares/sanitizeInput");
const {verifyWidgetPassword} = require("../middlewares/verifyWidgetPassword");

// Validators
const fileValidator = [
    body('file.url')
    .notEmpty().withMessage("File url can't be empty")
];

const idValidator = [
    param('id')
        .notEmpty().withMessage("File ID is missing")
        .isMongoId().withMessage("Invalid file ID")
];


const upload = getMulter();

router.route('/').post(verifyToken, handleValidationError, upload.single('file'), addFile);

router.route('/:id').get(idValidator, handleValidationError, verifyWidgetPassword, getFileById);

router.route('/all/:id').get(idValidator, handleValidationError, verifyWidgetPassword, getAllFiles);

router.route('/:id').put(verifyToken, idValidator, fileValidator, sanitizeWidget, handleValidationError, updateFile);

router.route('/:id').delete(verifyToken, idValidator, handleValidationError, deleteFile);

module.exports = router;