const encription = require("../generator/encript");
const stringRandom = require("../generator/stringGenerate");

const { hashPassword, comparePassword } = require("../generator/hashing");

const { createUser } = require("../model/auth");

// validation
const { validationResult } = require("express-validator");

//flash class
const FlashClass = (req, inputError, inputA, inputB) => {
  req.flash(inputError, "input-form-auth-register error-form");
  req.flash(inputA, "input-form-auth-register");
  req.flash(inputB, "input-form-auth-register");
};

// controller
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
        error: {
            msg: req.flash("msg"),
            classUsername: req.flash("username"),
            classPassword: req.flash("password"),
            classEmail: req.flash("email"),
        },
        layout: "layouts/main"
    });
};

const createRegister = async (req, res) => {
    const role = req.query.role;
    const data = req.body;

    // validation
    const errors = validationResult(req).array();
    if (errors.length > 0) {
        req.flash("msg", errors[0].msg);
        if (errors[0].msg.includes("username")) {
            FlashClass(req, "username", "password", "email");
        } else if (errors[0].msg.includes("password")) {
            FlashClass(req, "password", "username", "email");
        } else if (errors[0].msg.includes("email")) {
            FlashClass(req, "email", "password", "username");
        };
    res.redirect(`/auth/register?role=${role}`);
    };

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