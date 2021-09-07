const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("admin/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const stock = req.body.stock;
  const product = new Product({
    name: name,
    price: price,
    imageUrl: imageUrl,
    stock: stock,
  });

  product
    .save()
    .then(() => {
      res.redirect("/products");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }

      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.name;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedStock = req.body.stock;

  Product.findById(productId)
    .then((product) => {
      product.name = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.stock = updatedStock;
      return product
        .save()
        .then((result) => {
          console.log(result);
          res.redirect("/admin/products");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const deleteMode = req.query.delete;
  if (!deleteMode) {
    return res.redirect("/");
  }
  
  const productId = req.body.productId;

  Product.findByIdAndDelete(productId)
    .then(() => {
      console.log("Product Removed");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
