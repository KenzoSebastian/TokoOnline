const express = require("express");
const app = express();

// router
const routerAuth = require("./Route/routeAuth");

// generator string
const stringRandom = require("./generator/stringGenerate");

require("dotenv").config();
const port = process.env.PORT;

app.set("view engine", "ejs");
app.use(require("express-ejs-layouts"));
app.use(express.static("public"));

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
        layout: "layouts/main"
    });
});

app.use(`/${stringRandom}`, (req, res) => {
    res.status(404).render("pages/error", {
        title: "404 NOT FOUND",
        layout: "layouts/main"
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
