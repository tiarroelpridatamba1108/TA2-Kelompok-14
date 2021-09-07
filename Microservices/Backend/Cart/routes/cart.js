const express = require('express');

const cartController = require('../controllers/cart');

const router = express.Router();

router.post('/', cartController.getCart);

router.post('/add', cartController.addCart);

router.put('/', cartController.updateItem);

router.post('/clean', cartController.cleanCartItems);

router.delete('/:id', cartController.deleteCart);

router.post('/remove/:id', cartController.removeItem);

module.exports = router;
