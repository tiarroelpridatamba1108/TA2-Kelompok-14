const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const stock = req.body.stock;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;

  const product = new Product({
    name: name,
    price: price,
    stock: stock,
    imageUrl: imageUrl,
    description: description,
  });

  product
    .save()
    .then((result) => {
      if (!result) {
        return res.json('Product not Created!');
      }

      return res.json('Product created successfully');
    })
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

exports.putEditProduct = (req, res, next) => {
  const productId = req.body._id;
  const updatedName = req.body.name;
  const updatedPrice = req.body.price;
  const updatedStock = req.body.stock;
  const updatedImageUrl = req.body.imageUrl;
  const description = req.body.description;

  Product.findByIdAndUpdate(productId, {
    name: updatedName,
    price: updatedPrice,
    stock: updatedStock,
    imageUrl: updatedImageUrl,
    description: description,
  })
    .then((result) => {
      if (!result) {
        return res.json('Product not updated!');
      }

      return res.json('Product updated successfully');
    })
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.id;

  Product.findByIdAndDelete(productId)
    .then((result) => {
      if (!result) {
        return res.json('Product Not Deleted!');
      }

      return res.json('Product Deleted Successfully');
    })
    .catch((err) => {
      res.json('Error occurred');
      return console.error(err);
    });
};
