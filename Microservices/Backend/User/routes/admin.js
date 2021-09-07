const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getUsers);

router.get('/customer', adminController.getUserByCustomer);

router.get('/admin', adminController.getUserByAdmin);

router.post('/signup', adminController.postSignupAsAdmin);

router.delete('/:id', adminController.deleteUser);

router.get('/:id', adminController.getUserById);

module.exports = router;
