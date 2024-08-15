const express = require("express");
const app = express();

// router
const routerAuth = require("./Route/routeAuth");
const routeCustomers = require("./Route/routeCustomers");
const routeSellers = require("./Route/routeSellers");

// dotenv
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
const { updateAuthUser } = require("./model/auth");
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

//debug

app.use("/", routeCustomers);

app.use("/sellers", routeSellers);

app.get("/logout", async (req, res) => {
  // const role = req.query.role;
  // const userId = req.query.id;
  // await updateAuthUser(role, userId, false, "no token" );
  res.clearCookie("token");
  res.send("logout!");
});

app.use("/auth", routerAuth);

app.use("/", (req, res) => {
    res.status(404).render("pages/error", {
        title: "404 NOT FOUND",
        msg: req.flash("msg"),
        layout: "layouts/main"
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
