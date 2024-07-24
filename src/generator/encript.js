const cryptoJs = require("crypto-js");
const criptoEncrypt = cryptoJs.AES.encrypt;
const criptoBase64 = cryptoJs.enc.Base64;
const cryptoParse = cryptoJs.enc.Utf8.parse;

const encription = (string, key) => {
    const clip = criptoEncrypt(string, key).toString();
    return criptoBase64.stringify(cryptoParse(clip));
};


module.exports = encription;