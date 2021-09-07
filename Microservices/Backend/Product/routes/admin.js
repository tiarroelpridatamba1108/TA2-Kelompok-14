const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.post('/', adminController.postAddProduct);

router.put('/', adminController.putEditProduct);

router.delete('/:id', adminController.deleteProduct);

module.exports = router;
