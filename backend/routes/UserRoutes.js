const express = require("express");
const router = express.Router();

const {
  signUpController,
  loginController,
} = require("./../controllers/UserControllers");

// Signup
router.post("/signup", signUpController);

// Login Page
router.post("/login", loginController);

module.exports = router;
