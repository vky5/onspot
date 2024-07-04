const express = require('express')
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllWriter)

router.patch('/updateme', 
    authController.validateJWT,
    userController.updateUser
)

router.delete('/deleteme', 
    authController.validateJWT,
    userController.deleteUser
)


router.get('/info/:username?',
    authController.validateJWT,
    userController.getUserData
)

module.exports = router;