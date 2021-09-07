const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  let search = null;

  if (req.query.name) {
    search = req.query.name;
  }

  Product.find()
    .then((products) => {
      if (search) {
        products = products.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase()),
        );
      }

      res.json(products);
    })
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.id;

  Product.findById(productId)
    .then((product) => res.json(product))
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};
