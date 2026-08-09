const { body, validationResult } = require("express-validator");
async function validateResult(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
const registerUserValidationRules = [
    body("username").isString().trim().notEmpty().withMessage("Username is required").isLength({ min: 3, max: 20 }).withMessage("Username must be between 3 and 20 characters long"),
    body("email").isEmail().trim().notEmpty().withMessage("Email is required").isLength({ max: 50 }).withMessage("Email must be less than 50 characters long"),
    body("password").isLength({ min: 6 }).trim().notEmpty().withMessage("Password must be at least 6 characters long"),
    body("confirmPassword").trim().notEmpty().withMessage("Confirm Password is required")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),
    body("avatar").custom((value, { req }) => {
        if (!req.file) {
            throw new Error("Avatar is required");
        }
        return true;
    }),
    validateResult
]
module.exports = {
    registerUserValidationRules
}