const express = require('express');

const authController = require('../controllers/authController');
const commentControllers = require('../controllers/commentControllers');

const router = express.Router();

router
    .route('/:blogid')
    .post(
        authController.validateJWT,
        commentControllers.postComment
    )
    .patch(
        authController.validateJWT,
        commentControllers.updateComment
    )

module.exports = router;
