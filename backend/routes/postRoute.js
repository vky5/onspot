const express = require('express')
const authController = require('../controllers/authController')
const postController = require('../controllers/postController')

const router = express.Router();

router // this is to post and get all post and I am going to implement pagination and other API features here
    .route('/')
    .post(
        authController.validateJWT,
        authController.restrictsTo('admin', 'writer'),
        postController.postBlog
    )

router // this is to get info about a blog or patch blog only admin and original writer can make changes in a blog
    .route(':blogid')
    .get(
        postController.getBlogByParams
    )
    .patch(
        authController.validateJWT,
        authController.restrictsTo('admin', 'writer'),
        postController.updateBlog
    )
    .delete(
        authController.validateJWT,
        authController.restrictsTo('admin', 'writer'),
        postController.deleteBlog
    )

router // this route is to get all blogs from a particular writer
    .route(':writerid')
    .get(
        postController.getAllPosts
    )


module.exports = router;