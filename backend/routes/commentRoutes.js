const express = require('express');

const authController = require('../controllers/authController');
const commentControllers = require('../controllers/commentControllers');

const router = express.Router({mergeParams: true}); // to enable the params of the other like blog ID


/*
// root routes
GET api/v1/posts/:blogid/comments
POST api/v1/posts/:blogid/comments


// for get patch delete a particular comment
GET api/v1/posts/:blogid/comments/:commentid
PATCH api/v1/posts/:blogid/comments/:commentid
DELETE api/v1/posts/:blogid/comments/:commentid


// root routes
Will work too but postid need to be passed through the body
GET api/v1/comments 
POST api/v1/comments

//for particular comment
GET api/v1/comments/:commentid
PATCH api/v1/comments/:commentid
DELETE api/v1/comments/:commentid
*/


router 
    .route('/')
    .get(commentControllers.transferToParams,
        commentControllers.getCommentForPost
    )
    .post(
        authController.validateJWT,
        commentControllers.postComment
    )
    
router.get('/me', 
        authController.validateJWT,
        commentControllers.getCommentsForMe
    )

router
    .route('/:commentid')
    .get(
        commentControllers.getParticularComment
    )
    .patch(
        authController.validateJWT,
        commentControllers.updateComment
    )
    .delete(
        authController.validateJWT,
        commentControllers.deleteComment
    )

module.exports = router;
