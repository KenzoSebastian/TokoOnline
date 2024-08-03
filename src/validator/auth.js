const { body, check } = require("express-validator");

const validatorRegister = [
  // username
  body("username").custom((value) => {
    if (value.includes(" ")) {
      throw new Error("username cannot contain spaces");
    }
    return true;
  }),
  check("username", "username must be at least 5 characters").isLength({ min: 5 }),

  // email
    check("email", "email is not valid").isEmail(),

  // password
  body("password").custom((value, { req }) => {
    if (value !== req.body.passwordConfirm) {
      throw new Error("password confirmation does not match");
    }
    return true;
  }),
  check("password", "password must be at least 5 characters").isLength({ min: 5 }),
];

module.exports = { validatorRegister };