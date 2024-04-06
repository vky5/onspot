const express = require('express');

const authController = require('../controllers/authController');
const commentControllers = require('../controllers/commentControllers');

const router = express.Router();

router
    .route('/:blogid')
    .get(commentControllers.getCommentForPost) // no need to run validations for this
    .post(
        authController.validateJWT,
        commentControllers.postComment
    )

router
    .route('/:commentid?')
    .patch(
        authController.validateJWT,
        commentControllers.updateComment
    )
    .delete(
        authController.validateJWT,
        commentControllers.deleteComment
    )
router.get('/', 
    authController.validateJWT,
    commentControllers.getCommentsForUser
)

module.exports = router;
