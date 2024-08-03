const express = require("express");
const { login, register, error, createRegister, registerSuccess } = require("../controller/controlAuth");

// validator
const { validatorRegister } = require("../validator/auth");

const router = express.Router();

router.get("/login", login);

router.get("/register", register);
router.post("/register", validatorRegister ,createRegister);
router.get("/register/success", registerSuccess);

router.use("/", error);

module.exports = router;
