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

router
    .route('/:commentid')
    .patch(
        authController.validateJWT,
        commentControllers.updateComment
    )
    .delete(
        authController.validateJWT,
        commentControllers.deleteComment
    )

module.exports = router;
