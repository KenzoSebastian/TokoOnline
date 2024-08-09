const express = require("express");
const app = express();

const { getAuthCustomers, getUser } = require("./model/auth");

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

app.get("/", async (req, res) => {
    if (!req.cookies.token) {
        res.redirect("/auth/login?role=customers");
    } else {
        const [result] = await getAuthCustomers(req.cookies.token);
        if (result.length === 0) {
            res.redirect("/auth/login?role=customers");
        } else {
            console.log(result);
            try {
                const [data] = await getUser(result[0].id_customers, "customers", "id");
                console.log(data);
                res.render("pages/dashboard", {
                    title: "beranda",
                    data : data[0],
                    layout: "layouts/main"
                });
            } catch (error) {
                
            }

        }
    }
    
});

app.get("/logout", (req, res) => {
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
