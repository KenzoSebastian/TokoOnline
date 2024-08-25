const pool = require("../database/db");

const createUser = (data, role) => {
    const query = `INSERT INTO ${role}(username, email, password) VALUE("${data.username}", "${data.email}", "${data.password}")`;
    return pool.execute(query);
};

const updatePasswordUser = ( role, password, id) => {
    const query = `UPDATE ${role} SET password = "${password}" WHERE id = ${id}`;
    return pool.execute(query);
};

const createAuthUser = (role, idUser) => {
    const query = `INSERT INTO auth_${role} (id_${role}) VALUES (${idUser})`;
    return pool.execute(query);
};

const updateAuthUser = (role, idUser, value, token) => {
    const query = `UPDATE auth_${role} SET status = ${value}, token = "${token}" WHERE id_${role} = ${idUser}`;
    return pool.execute(query);
};

const getAuthCustomers = (token) => {
    const query = `SELECT * FROM auth_customers WHERE token = "${token}"`;
    return pool.execute(query);
};

const getAuthSellers = (token) => {
    const query = `SELECT * FROM auth_sellers WHERE token = "${token}"`;
    return pool.execute(query);
};

const getUser = (value, role, key = "username") => {
  const query = `SELECT * FROM ${role} WHERE ${key} = "${value}"`;
  return pool.execute(query);
};

module.exports = { createUser, updatePasswordUser, createAuthUser,updateAuthUser, getAuthCustomers, getAuthSellers, getUser };