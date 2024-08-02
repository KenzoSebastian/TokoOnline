const encription = require("../generator/encript");
const stringRandom = require("../generator/stringGenerate");

const { hashPassword, comparePassword } = require("../generator/hashing");

const { createUser } = require("../model/auth");
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

const createRegister = async (req, res) => {
    const role = req.query.role;
    const data = req.body;

    if (data.password !== data.passwordConfirm) {
        req.flash("msg", "password confirmation does not match");
        res.redirect(`/auth/register?role=${role}`);
    }

    // encryption password
    data.password = await hashPassword(data.password);    
    delete data.passwordConfirm;
    try {
        await createUser(data, role);
        res.redirect(`/auth/register/success?role=${role}`);
    } catch (error) {
        req.flash("msg", error.message);
        res.redirect(`/${stringRandom}`);
    };
};

const registerSuccess = (req, res) => {
    const role = req.query.role;
    res.render("pages/registerSuccess", {
        title: "Sign Up",
        role,
        layout: "layouts/main"
    });
};

const error = (req, res) => {
    res.redirect(`/${stringRandom}`);
};

module.exports = { login, register, error, createRegister, registerSuccess };