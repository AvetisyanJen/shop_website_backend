const { body } = require('express-validator');

const registerValidationRules = [
    body("userName")
      .isLength({ min: 6 })
      .withMessage("UserName must be at least 6 characters")
      .notEmpty()
      .withMessage("UserName can not be empty"),
    body("email").isEmail().withMessage("Bad email address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
  ];

  const loginValidationRules = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ];

module.exports = {registerValidationRules,loginValidationRules}