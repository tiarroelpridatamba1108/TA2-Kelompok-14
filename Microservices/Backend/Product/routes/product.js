const express = require('express');

const router = express.Router();

const productController = require('../controllers/product');

//Product
router.get('/', productController.getProducts);

router.get('/:id', productController.getProductById);

module.exports = router;
