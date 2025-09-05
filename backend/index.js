const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

// const Product = require("./models/ProductsModel");
// const Users = require("./models/UserModel");

const ProductRoutes = require("./routes/ProductRoutes");
const UserRoutes = require("./routes/UserRoutes");
// const authMiddleware = require("./middlewares/authMiddleware");

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://your-frontend-domain.vercel.app",
      "https://your-admin-domain.vercel.app",
    ],
  })
);

//Database Connection
mongoose.connect(
  "mongodb+srv://kuragayalaanil007:5wJf8ek3izw4aJwM@ecommerce.aprt6sw.mongodb.net/ecommerce"
);

// Api
app.get("/", (req, res) => {
  res.send("Express app is running");
});

// Images Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });
// Creating upload endpoint for images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Schema for creating Products
// const Product = mongoose.model("Product", {
//   id: {
//     type: Number,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   new_price: {
//     type: Number,
//     required: true,
//   },
//   old_price: {
//     type: Number,
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now(),
//   },
//   available: {
//     type: Boolean,
//     default: true,
//   },
// });

app.use("/", ProductRoutes);
app.use("/", UserRoutes);
// app.use(authMiddleware);

//* //////////////////////////////////////////////////////////////////////////////////////////*
//! Add Product Route
// app.post("/addProduct", async (req, res) => {
//   let prodcuts = await Product.find({});
//   let id;
//   if (prodcuts.length > 0) {
//     let last_product_array = prodcuts.slice(-1);
//     let last_product = last_product_array[0];
//     id = last_product.id + 1;
//   } else {
//     id = 1;
//   }
//   const product = new Product({
//     id: id,
//     name: req.body.name,
//     image: req.body.image,
//     category: req.body.category,
//     new_price: req.body.new_price,
//     old_price: req.body.old_price,
//   });
//   console.log(product);
//   await product.save();
//   console.log("Saved");
//   res.json({
//     success: true,
//     name: req.body.name,
//   });
// });

//! Creating an API for removing Product
// app.post("/removeproduct", async (req, res) => {
//   await Product.findOneAndDelete({ id: req.body.id });
//   console.log("Removed");
//   res.json({
//     success: true,
//     name: req.body.name,
//   });
// });

//! Creating an api to get all products
// app.get("/allproducts", async (req, res) => {
//   let products = await Product.find({});
//   console.log("All products Fetched");
//   res.send(products);
// });

// Schema for User Model
// const Users = mongoose.model("Users", {
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   cartData: {
//     type: Object,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// Api for User Creation / Registration

//! Signup
// app.post("/signup", async (req, res) => {
//   let check = await Users.findOne({ email: req.body.email });
//   if (check) {
//     return res.status(400).json({
//       success: false,
//       errors: "User Already Registered",
//     });
//   }
//   let cart = {};
//   for (let i = 0; i < 300; i++) {
//     cart[i] = 0;
//   }
//   const user = new Users({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     cartData: cart,
//   });
//   await user.save();
//   const data = {
//     user: {
//       id: user.id,
//     },
//   };
//   const token = jwt.sign(data, "secret_ecom");
//   res.json({
//     success: true,
//     token,
//   });
// });

// Login
// app.post("/login", async (req, res) => {
//   let user = await Users.findOne({ email: req.body.email });
//   if (user) {
//     const passCompare = req.body.password === user.password;
//     if (passCompare) {
//       const data = {
//         user: {
//           id: user.id,
//         },
//       };
//       const token = jwt.sign(data, "secret_ecom");
//       res.json({
//         success: true,
//         token,
//       });
//     }
//     res.json({
//       success: false,
//       errors: "Wrong Credentials",
//     });
//   } else {
//     res.json({
//       success: false,
//       errors: "User not found",
//     });
//   }
// });

// Creating endpoint for newcollection data

// app.get("/newcollections", async (req, res) => {
//   let products = await Product.find({});
//   let newcollection = products.slice(1).slice(-8);
//   console.log("newcollection Fetched");
//   res.send(newcollection);
// });

// Creating endpoint for popular in women category
// app.get("/popularinwomen", async (req, res) => {
//   let products = await Product.find({ category: "women" });
//   let popular_in_women = products.slice(0, 4);
//   console.log("Popular in women Fetched");
//   res.send(popular_in_women);
// });

// Creating Middleware to fetch user

// const fetchUser = async (req, res, next) => {
//   const token = req.header("auth-token");
//   if (!token) {
//     res.status(401).send({
//       errors: "Please Autentication using token",
//     });
//   } else {
//     try {
//       const data = jwt.verify(token, "secret_ecom");
//       req.user = data.user;
//       next();
//     } catch (error) {
//       res.status(401).send({
//         errors: "Please Authenticate using a valid token",
//       });
//     }
//   }
// };

// creating endpoint for adding products in cartdata

// app.post("/addtocart", fetchUser, async (req, res) => {
//   console.log("Added", req.body.itemId);
//   let userData = await Users.findOne({ _id: req.user.id });
//   userData.cartData[req.body.itemId] += 1;
//   await Users.findOneAndUpdate(
//     { _id: req.user.id },
//     { cartData: userData.cartData }
//   );
//   res.send("Added");
// });

// Creating endpoint for remove product from cartdata
// app.post("/removefromcart", fetchUser, async (req, res) => {
//   console.log("Removed", req.body.itemId);
//   let userData = await Users.findOne({ _id: req.user.id });
//   if (userData.cartData[req.body.itemId] > 0)
//     userData.cartData[req.body.itemId] -= 1;
//   await Users.findOneAndUpdate(
//     { _id: req.user.id },
//     { cartData: userData.cartData }
//   );
//   res.send("Removed");
// });

// creating a endpoint for get cart data
// app.post("/getcart", fetchUser, async (req, res) => {
//   console.log("Get Cart");
//   let userData = await Users.findOne({ _id: req.user.id });
//   res.json(userData.cartData);
// });

// API Creation
app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on PORT" + port);
  } else {
    console.log("Error:" + error);
  }
});
