const encription = require("../generator/encript");
const stringRandom = require("../generator/stringGenerate");

const { hashingData, compareDataHashing } = require("../generator/hashing");

const { createUser, getUser, createAuthUser, updateAuthUser } = require("../model/auth");

// validation
const { validationResult } = require("express-validator");

//flash class
const FlashClass = (req, page, inputError, ...inputNormal) => {
    req.flash(inputError, `input-form-auth-${page}-error`);
    inputNormal.forEach((input) => {
        req.flash(input, `input-form-auth-${page}`);
    });
};

// controller
const login = (req, res) => {
    const role = req.query.role;
    res.render("pages/login", {
        title: "Sign In",
        greeting: "hi there! we're glad you're back again",
        role: req.query.role,
        error: {
            msg: req.flash("msg"),
            classUsername: req.flash("username"),
            classPassword: req.flash("password"),
        },
        layout: "layouts/main"
    });
};

const authLogin = async (req, res) => {
    const role = req.query.role;
    const data = req.body;

    // validation
    const errors = validationResult(req).array();
    if (errors.length > 0) {
        req.flash("msg", errors[0].msg);
        if (errors[0].msg.includes("username")) {
            FlashClass(req, "login", "username", "password");
        } else if (errors[0].msg.includes("password")) {
            FlashClass(req, "login", "password", "username");
        };

        res.redirect(`/auth/login?role=${role}`);
    } else {
        // set table auth
        try {
            const [result] = await getUser(data.username, role);
            const arrHashing = Array.from(await hashingData(Date.now().toString()));
            const filterHashing = arrHashing.filter((item) => item !== "-" && item !== "/" && item !== ".");
            const token = filterHashing.reverse().join("").substring(0, 15);
            await updateAuthUser(role, result[0].id, true, token);
            res.cookie("token", token, {
              maxAge: 2147483647000,
              httpOnly: true,
            });
            role === "customers" ? res.redirect("/") : res.redirect("/sellers");
        } catch (error) {
            req.flash("msg", error.message);
            res.redirect(`/${stringRandom("error")}`);
        }
    }
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

const authRegister = async (req, res) => {
    const role = req.query.role;
    const data = req.body;

    // validation
    const errors = validationResult(req).array();
    if (errors.length > 0) {
        req.flash("msg", errors[0].msg);
        if (errors[0].msg.includes("username")) {
            FlashClass(req, "register", "username", "password", "email");
        } else if (errors[0].msg.includes("password")) {
            FlashClass(req, "register", "password", "username", "email");
        } else if (errors[0].msg.includes("email")) {
            FlashClass(req, "register", "email", "password", "username");
        };

        res.redirect(`/auth/register?role=${role}`);
    } else {
        // encryption password
        data.password = await hashingData(data.password);    
        delete data.passwordConfirm;

        // create user
        try {
            const [result] = await createUser(data, role);
            await createAuthUser(role, result.insertId);
            res.redirect(`/auth/register/success?role=${role}`);
        } catch (error) {
            req.flash("msg", error.message);
            res.redirect(`/${stringRandom("error")}`);
        };
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
    res.redirect(`/${stringRandom("error")}`);
};

module.exports = { login, register, error, authRegister, authLogin, registerSuccess };