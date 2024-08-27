const pool = require("../database/db");
const { apiProducts } = require("../API/axios");
const { shuffleArray } = require("../generator/arrayModifier");

const getCartUser = idCustomer => {
  const query = `SELECT * FROM cart WHERE id_customers = ${idCustomer}`;
  return pool.execute(query);
};

const getProductbyCategory = async category => {
  const { data } = await apiProducts.get(`/category/${category}`);
  return data.products;
};

let arrayProducts = [];

const getAllProducts = async () => {
  const { data } = await apiProducts.get("/category-list");
  arrayProducts.length = 0;
  
  for (const category of data) {
    const result = await getProductbyCategory(category);
    arrayProducts = [...arrayProducts, ...result];
  };
  return arrayProducts;
};

const insertWishlist = async idProduct => {
  const query = `INSERT INTO wishlist(id_customers, id_products) VALUE(${idProduct}, ${idProduct})`;
  return pool.execute(query);
};

module.exports = { getCartUser, getAllProducts, insertWishlist };
