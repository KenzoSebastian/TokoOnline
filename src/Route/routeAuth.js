const express = require("express");
const { login, register, error, createRegister, registerSuccess } = require("../controller/controlAuth");
const router = express.Router();

router.get("/login", login);

router.get("/register", register);
router.post("/register", createRegister);
router.get("/register/success", registerSuccess);

router.use("/", error);

module.exports = router;
