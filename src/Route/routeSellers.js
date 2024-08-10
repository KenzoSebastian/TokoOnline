const express = require("express");
const router = express.Router();
const { getSellers } = require("../controller/controlSellers");

router.get("/", getSellers);

module.exports = router;
