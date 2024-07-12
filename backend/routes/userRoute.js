const express = require('express')
const likeRoute = require('../routes/likeRoute');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.use('/likes', likeRoute);

router.get('/', userController.getAllWriter)

router.patch('/updateme', 
    authController.validateJWT,
    userController.updateUser
)

router.delete('/deleteme', 
    authController.validateJWT,
    userController.deleteUser
)

router.get('/me', 
    authController.validateJWT,
    userController.meEndpoint,
    userController.getUserDataForMe
)

router.get('/:user',
    authController.validateJWT,
    userController.getUserData
)

module.exports = router;