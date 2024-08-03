const pool = require("../database/db");

const createUser = (data, role) => {
    const query = `INSERT INTO ${role}(username, email, password) VALUE("${data.username}", "${data.email}", "${data.password}")`;
    return pool.execute(query);
};

const getUser = (email) => {
    const query = `SELECT * FROM customers WHERE email = "${email}"`;
    return pool.execute(query);
};

module.exports = { createUser };