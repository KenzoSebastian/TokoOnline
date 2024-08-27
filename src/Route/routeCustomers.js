const express = require("express");
const router = express.Router();
const { getCustomers, insertFavorite } = require("../controller/controlCustomers");

router.get("/", getCustomers);
router.post("/addToFavorite", insertFavorite);

module.exports = router;