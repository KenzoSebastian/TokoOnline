const { body, check } = require("express-validator");
const { getUser } = require("../model/auth");
const { comparePassword } = require("../generator/hashing");

const validatorRegister = [
  // username
  body("username").custom((value) => {
    if (value.includes(" ")) throw new Error("username cannot contain spaces");
    return true;
  }),
  check("username", "username must be at least 5 characters").isLength({ min: 5 }),
  body("username").custom(async (value, { req }) => {
    const role = req.query.role;
    const [result] = await getUser(value, role);
    if (result.length > 0) throw new Error("username already exists");
    return true;
  }),

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
    if (!await comparePassword(req.body.password, result[0].password)) throw new Error("password not match");
    return true;
  }),
];


module.exports = { validatorRegister, validatorLogin };