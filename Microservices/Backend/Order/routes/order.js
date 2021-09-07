const express = require('express');

const orderController = require('../controllers/order');

const router = express.Router();

router.post('/payment', orderController.postPayment);

router.put('/cancel', orderController.postCancelOrder);

router.post('/add', orderController.postOrder);

router.post('/', orderController.getOrdersByUserId);

router.post('/delete/:id', orderController.deleteOrder);

router.post('/:id', orderController.getUserOrderById);

module.exports = router;
