const stringRandom = require("../generator/stringGenerate");

const login = (req, res) => {
    const role = req.query.role;
    res.render("pages/login", {
        title: "Sign In",
        layout: "layouts/main"
    });
};

const register = (req, res) => {
    res.render("pages/register", {
        title: "Sign Up",
        layout: "layouts/main"
    });
};

const error = (req, res) => {
    res.redirect(`/${stringRandom}`);
};

module.exports = { login, register, error };