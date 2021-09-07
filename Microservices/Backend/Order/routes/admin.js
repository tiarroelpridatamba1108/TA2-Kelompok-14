const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getOrders);

router.post('/accept', adminController.postAcceptPayment);

router.post('/reject', adminController.postRejectPayment);

router.get('/:id', adminController.getOrderById);

module.exports = router;
