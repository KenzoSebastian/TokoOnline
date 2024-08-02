const mysql = require("mysql2");

const host = process.env.HOSTNAME_DB;
const user = process.env.USERNAME_DB;
const password = process.env.PASSWORD_DB;
const database = process.env.DATABASE || "sebastore";

const pool = mysql.createPool({ host, user, password, database });

module.exports = pool.promise();