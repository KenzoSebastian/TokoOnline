const { getAuthCustomers, getUser } = require("../model/auth");
const { getCartUser, getAllProducts } = require("../model/customers");

const stringRandom = require("../generator/stringGenerate");
const { arrayModifier } = require("../generator/arrayModifier");

const getCustomers = async (req, res) => {
  // cookie token
  if (!req.cookies.token) return res.redirect("/auth/login?role=customers");

  try {
    // table auth
    const [result] = await getAuthCustomers(req.cookies.token);
    if (result.length === 0) return res.redirect("/auth/login?role=customers");

    // table user
    const [data] = await getUser(result[0].id_customers, "customers", "id");
    // table cart
    const [cart] = await getCartUser(result[0].id_customers);

    // 
    const allProducts = await getAllProducts();

    const products = arrayModifier(allProducts, 36);
    res.render("pages/dashboard", {
      title: "beranda",
      data: { user: data[0], cart, products },
      layout: "layouts/main",
    });
  } catch (error) {
    req.flash("msg", error.message);
    res.redirect(`/${stringRandom("error")}`);
  }
};

module.exports = { getCustomers };
