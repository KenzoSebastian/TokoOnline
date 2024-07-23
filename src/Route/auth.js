const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
    res.send("ini halaman login");
});

router.get("/register", (req, res) => {
    res.send("ini halaman register");
});

module.exports = router;
