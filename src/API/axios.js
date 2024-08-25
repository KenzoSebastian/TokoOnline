const axios = require("axios");

const apiProducts = axios.create({
    baseURL: "https://dummyjson.com/products",
});

module.exports = { apiProducts };