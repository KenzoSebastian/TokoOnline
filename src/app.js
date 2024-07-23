const express = require("express");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs");
app.use(require("express-ejs-layouts"));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("dashboard", {
        title: "beranda",
        layout: "layouts/main"
    });
});

app.use("/", (req, res) => {
    res.status(404).render("error", {
        title: "404 NOT FOUND",
        layout: "layouts/main"
    })
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
