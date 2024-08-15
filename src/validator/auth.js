const { body, check } = require("express-validator");
const { getUser } = require("../model/auth");
const { compareDataHashing } = require("../generator/hashing");

const validatorRegister = [
  // username
  body("username").custom(async (value, { req }) => {
    if (value.includes(" ")) throw new Error("username cannot contain spaces");
    
    const role = req.query.role;
    const [result] = await getUser(value, role);
    if (result.length > 0) throw new Error("username already exists");
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

const validatorLogin = [
  body("username").custom(async(value, { req }) => {
    const role = req.query.role;
    const [result] = await getUser(value, role);
    // check username
    if (result.length === 0) throw new Error("username not found");

    // check password
    if (!await compareDataHashing(req.body.password, result[0].password)) throw new Error("password not match");
    return true;
  }),
];

const validatorForgot = [
  check("email", "email is not valid").isEmail(),
  body("email").custom(async (value, { req }) => {
    const role = req.query.role;
    const [result] = await getUser(value, role, "email");
    if (result.length === 0) throw new Error("email not found");
    return true;
  }),
];

const validatorChangePassword = [
  body("newPassword").custom(async (value, { req }) => {
    if (value !== req.body.confirmPassword) throw new Error("password confirmation does not match");

    if (await compareDataHashing(value, req.body.oldPassword)) throw new Error("new password cannot be the same as old password");
    return true;
  }),
  check("newPassword", "password must be at least 5 characters").isLength({ min: 5 }),
];


module.exports = { validatorRegister, validatorLogin, validatorForgot, validatorChangePassword };