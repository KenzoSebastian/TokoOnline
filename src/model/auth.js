const pool = require("../database/db");

const createUser = (data, role) => {
    const query = `INSERT INTO ${role}(username, email, password) VALUE("${data.username}", "${data.email}", "${data.password}")`;
    return pool.execute(query);
};

module.exports = { createUser };