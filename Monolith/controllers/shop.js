const Product = require("../models/product");
const Cart = require("../models/cart");
const Order = require("../models/order");

exports.getProductById = (req, res, next) => {
  Product.findById(req.params.productId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.findOne({ userId: req.user._id })
    .populate("items.productId")
    .exec()
    .then((cart) => {
      const products = cart.items;
      res.render("shop/cart", {
        products: products,
        path: "/cart",
        pageTitle: "Your Cart",
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  Cart.findOne({ userId: req.user._id })
    .then((cart) => {
      Product.findById(req.body.productId)
        .then((product) => {
          const cartProductIndex = cart.items.findIndex((cp) => {
            return cp.productId.toString() === product._id.toString();
          });
          let newQuantity = 1;
          const updatedCartItems = [...cart.items];

          if (cartProductIndex >= 0) {
            newQuantity = cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
          } else {
            updatedCartItems.push({
              productId: product._id,
              quantity: newQuantity,
            });
          }

          cart.items = updatedCartItems;
          return cart.save();
        })
        .then(() => {
          res.redirect("/cart");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  Cart.findOne({ userId: req.user._id })
    .then((cart) => {
      const updatedCartItems = cart.items.filter((item) => {
        return item.productId.toString() !== productId.toString();
      });

      cart.items = updatedCartItems;
      return cart.save();
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  const userId = req.user._id;
  const address = req.body.address;

  Cart.findOne({ userId: userId })
    .populate("items.productId")
    .exec()
    .then((cart) => {
      const products = cart.items;

      const order = new Order({
        products: products,
        userId: userId,
        orderDate: Date.now(),
        address: address,
      });

      cart.items = [];
      cart.save();
      return order.save();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ userId: req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.getOrderById = (req, res, next) => {
  const orderId = req.params.orderId;
  const userId = req.user._id;

  Order.findById(orderId)
    .populate("products.productId")
    .exec()
    .then((order) => {
      if (order.userId.toString() != userId.toString()) {
        order = null;
      }

      res.render("shop/order-detail", {
        path: "/orders",
        pageTitle: order._id,
        order: order,
      });
    })
    .catch((err) => console.log(err));
};
