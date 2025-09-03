const express = require("express");
const {
  addProductController,
  removeProductController,
  allProductsController,
  newCollectionController,
  popularInWomenController,
} = require("../controllers/ProductControllers");
const router = express.Router();

// Add Product
router.post("/addProduct", addProductController);

// Remove Product
router.post("/removeproduct", removeProductController);

// All Products
router.get("/allproducts", allProductsController);

// All Collection
router.get("/newcollections", newCollectionController);

// Popular in Women
router.get("/popularinwomen", popularInWomenController);

module.exports = router;
