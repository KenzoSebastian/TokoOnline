const bcrypt = require("bcrypt");

const hashingData = async(data) => {
    const saltRounds = 10;
    try {
        const hashedData = await bcrypt.hash(data, saltRounds);
        return hashedData;
    } catch (error) {
        console.error("error hashing data:", error);
    };
};

const compareDataHashing = async (data, hashedData) => {
    try {
        const compare = await bcrypt.compare(data, hashedData);
        return compare;
    } catch (error) {
        console.error("error comparing data:", error);
    };
}

module.exports = { hashingData, compareDataHashing };