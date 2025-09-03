const Product = require("../models/ProductsModel");

// Add Product controller

const addProductController = async (req, res) => {
  let prodcuts = await Product.find({});
  let id;
  if (prodcuts.length > 0) {
    let last_product_array = prodcuts.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
};

// Remove Product Controller
const removeProductController = async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
};

// All Products Controller
const allProductsController = async (req, res) => {
  let products = await Product.find({});
  console.log("All products Fetched");
  res.send(products);
};

// New Collection
const newCollectionController = async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("newcollection Fetched");
  res.send(newcollection);
};

// Popular in Women
const popularInWomenController = async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  console.log("Popular in women Fetched");
  res.send(popular_in_women);
};

module.exports = {
  addProductController,
  removeProductController,
  allProductsController,
  newCollectionController,
  popularInWomenController,
};
