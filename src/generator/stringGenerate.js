const { v4: uuidv4 } = require('uuid');
const encription = require("./encript");
const strBuffer = uuidv4();

const stringRandom = str => encription(strBuffer.split("-").join(""), str);

module.exports = stringRandom;