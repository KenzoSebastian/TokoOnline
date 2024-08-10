    const { getAuthSellers, getUser } = require("../model/auth");

    const getSellers = async (req, res) => {
    // cookie token
    if (!req.cookies.token) return res.redirect("/auth/login?role=sellers");

    try {
        // database auth
        const [result] = await getAuthSellers(req.cookies.token);
        if (result.length === 0) return res.redirect("/auth/login?role=sellers");

        // database user
        const [data] = await getUser(result[0].id_sellers, "sellers", "id");
        console.log(data);
        res.render("pages/sellers", {
            title: "beranda",
            data: data[0],
            layout: "layouts/main",
        });
    } catch (error) {
        req.flash("msg", error.message);
        return res.redirect(`/${stringRandom("error")}`);
    }
    };

module.exports = { getSellers };
