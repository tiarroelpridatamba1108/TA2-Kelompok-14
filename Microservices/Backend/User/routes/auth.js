const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.put('/', authController.updateUser);

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

router.put('/password', authController.updatePassword);

module.exports = router;
