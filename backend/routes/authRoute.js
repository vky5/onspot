const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.post('/forgotpassword', authController.forgotPassword); // this will only recieve email address

router.patch('/resetpassword/:token', authController.resetPassword); // this is to reset password

router.patch('/updatepassword', authController.validateJWT, authController.updatePassword)

// router.get('/validate', authController.validateJWT);
module.exports = router;