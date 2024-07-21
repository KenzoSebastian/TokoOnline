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
        style: "dashboard/style.css",
        script: "dashboard/script.js",
        layout: "layouts/main"
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
