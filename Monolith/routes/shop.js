const express = require("express");

const shopController = require("../controllers/shop");
const isAuth = require("../middlewares/is-auth");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products/:productId", shopController.getProductById);

router.get("/cart", isAuth.isAuthenticated, shopController.getCart);

router.post("/cart", isAuth.isAuthenticated, shopController.postCart);

router.post("/cart-delete-item", isAuth.isAuthenticated, shopController.postCartDeleteProduct);

router.post("/create-order", isAuth.isAuthenticated, shopController.postOrder);

router.get("/orders", isAuth.isAuthenticated, shopController.getOrders);

router.get("/orders/:orderId", isAuth.isAuthenticated, shopController.getOrderById);

module.exports = router;
