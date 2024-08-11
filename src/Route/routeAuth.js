const express = require("express");
const { login, register, error, authRegister, authLogin, registerSuccess, forgotPassword, checkEmail, inputNewPassword, changePassword } = require("../controller/controlAuth");

// validator
const { validatorRegister, validatorLogin, validatorForgot, validatorChangePassword } = require("../validator/auth");

const router = express.Router();

router.get("/login", login);
router.post("/login", validatorLogin, authLogin);

router.get("/register", register);
router.post("/register", validatorRegister ,authRegister);
router.get("/register/success", registerSuccess);

router.get("/forgot", forgotPassword);
router.post("/forgot", validatorForgot, checkEmail);
router.get("/forgot/changePassword", inputNewPassword);
router.post("/forgot/changePassword", validatorChangePassword, changePassword);

router.use("/", error);

module.exports = router;
