const express = require("express");
const app = express();

// router
const routerAuth = require("./Route/routeAuth");

// generator string
const stringRandom = require("./generator/stringGenerate");

require("dotenv").config();
const port = process.env.PORT;

// view engine
app.set("view engine", "ejs");
app.use(require("express-ejs-layouts"));

// file static
app.use(express.static("public"));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// flash message
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
app.use(cookieParser("secret"));
app.use(session({
        cookie: { maxAge: 6000 },
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    }));
app.use(flash());

//debug

app.get("/", (req, res) => {
    res.render("pages/dashboard", {
        title: "beranda",
        layout: "layouts/main"
    });
});

app.use("/auth", routerAuth);

app.use("/", (req, res) => {
    res.status(404).render("pages/error", {
        title: "404 NOT FOUND",
        msg: req.flash("msg"),
        layout: "layouts/main"
    });
});

app.use(`/${stringRandom}`, (req, res) => {
    res.status(404).render("pages/error", {
        title: "404 NOT FOUND",
        msg: req.flash("msg"),
        layout: "layouts/main"
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
