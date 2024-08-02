const bcrypt = require("bcrypt");

const hashPassword = async(password) => {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error("error hashing password:", error);
    };
};

const comparePassword = async (password, hashedPassword) => {
    try {
        const compare = await bcrypt.compare(password, hashedPassword);
        return compare;
    } catch (error) {
        console.error("error comparing password:", error);
    };
}

module.exports = { hashPassword, comparePassword };