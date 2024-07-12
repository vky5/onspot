const express = require('express');
const likeController = require('../controllers/likeController');
const authController = require('../controllers/authController');

const router = express.Router({mergeParams: true});

/*

*   PATCH /api/v1/posts/:blogid/likes  - will be used to change if a user likes or unlikes the blog
    GET /api/v1/posts/:blogid/likes - will get all the liked post by the logged in user

*   GET /api/v1/users/likes - get all likes by user
    PATCH /api/v1/users -  it will fail with the error no document found becausse no blogid specified 

*/
router
    .route('/')
    .get(
        authController.validateJWT,
        likeController.getAllLikedPostsByUser
    ).patch(
        authController.validateJWT,
        likeController.likeAPost
    )

module.exports = router;
