const { getAuthCustomers, getUser } = require("../model/auth");
const stringRandom = require("../generator/stringGenerate");

const getCustomers = async (req, res) => {
    // cookie token
    if (!req.cookies.token) return res.redirect("/auth/login?role=customers");

    try {
        // database auth
        const [result] = await getAuthCustomers(req.cookies.token);
        if (result.length === 0) return res.redirect("/auth/login?role=customers");

        // database user
        const [data] = await getUser(result[0].id_customers, "customers", "id");
        res.render("pages/dashboard", {
            title: "beranda",
            data: data[0],
            layout: "layouts/main",
        });
    } catch (error) {
        req.flash("msg", error.message);
        res.redirect(`/${stringRandom("error")}`);
        };
};

module.exports = { getCustomers };
