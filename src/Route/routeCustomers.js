const express = require("express");
const router = express.Router();
const { getCustomers } = require("../controller/controlCustomers");

router.get("/", getCustomers);

module.exports = router;