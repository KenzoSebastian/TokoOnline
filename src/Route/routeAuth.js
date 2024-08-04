const express = require("express");
const { login, register, error, authRegister, authLogin, registerSuccess } = require("../controller/controlAuth");

// validator
const { validatorRegister, validatorLogin } = require("../validator/auth");

const router = express.Router();

router.get("/login", login);
router.post("/login", validatorLogin, authLogin);

router.get("/register", register);
router.post("/register", validatorRegister ,authRegister);
router.get("/register/success", registerSuccess);

router.use("/", error);

module.exports = router;
