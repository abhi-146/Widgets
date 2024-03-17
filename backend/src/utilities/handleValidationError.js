const {validationResult} = require("express-validator");

exports.handleValidationError = (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let formattedErrors = {};
        // Customizing error messages in the response
        errors.array().forEach(error => {
            formattedErrors[error.path] = error.msg;
        });
        return res.status(400).json({ fieldErrors: formattedErrors });
    }
    next();
}