const express = require("express");
const { login, register, error } = require("../controller/controlAuth");
const router = express.Router();

router.get("/login", login);

router.get("/register", register);

router.use("/", error);

module.exports = router;
