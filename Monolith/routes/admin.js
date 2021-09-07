const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middlewares/is-auth");

const router = express.Router();

router.get("/products", isAuth.isAuthorized, adminController.getProducts);

router.get("/add-product", isAuth.isAuthorized, adminController.getAddProduct);

router.post("/add-product", isAuth.isAuthorized, adminController.postAddProduct);

router.get("/edit-product/:productId", isAuth.isAuthorized, adminController.getEditProduct);

router.post("/edit-product", isAuth.isAuthorized, adminController.postEditProduct);

router.post("/delete-product", isAuth.isAuthorized, adminController.postDeleteProduct);

module.exports = router;
