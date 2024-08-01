const stringRandom = require("../generator/stringGenerate");

const login = (req, res) => {
    const role = req.query.role;
    res.render("pages/login", {
        title: "Sign In",
        greeting: "hi there! we're glad you're back again",
        layout: "layouts/main"
    });
};

const register = (req, res) => {
    res.render("pages/register", {
        title: "Sign Up",
        greeting: "hello, Fill out this form to join our amazing community!",
        role: req.query.role,
        msg: req.flash("msg"),
        layout: "layouts/main"
    });
};

const createRegister = (req, res) => {
    const role = req.query.role;
    
    if (req.body.password !== req.body.passwordConfirm) {
        req.flash("msg", "password confirmation does not match");
        res.redirect(`/auth/register?role=${role}`);
    } else {
        res.send("password sama");

    }

};

const error = (req, res) => {
    res.redirect(`/${stringRandom}`);
};

module.exports = { login, register, error, createRegister };