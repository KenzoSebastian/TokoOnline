const { v4: uuidv4 } = require('uuid');
const strBuffer = uuidv4();

const stringRandom = strBuffer.split("-").join("");

module.exports = stringRandom;