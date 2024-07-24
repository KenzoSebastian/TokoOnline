const { v4: uuidv4 } = require('uuid');
const encription = require("./encript");
const strBuffer = uuidv4();

const stringRandom = encription(strBuffer.split("-").join(""), "error");

module.exports = stringRandom;