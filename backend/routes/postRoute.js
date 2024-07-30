const express = require('express')
const commentRoute = require('../routes/commentRoutes');
const likeRoute = require('../routes/likeRoute');
const tagRoute = require('../routes/tagRoute');
const authController = require('../controllers/authController')
const postController = require('../controllers/postController')

const router = express.Router();

router.use('/tags', tagRoute);
router.use('/:blogid/comments', commentRoute);
router.use('/:blogid/likes', likeRoute);

router // this is to post and get all post and I am going to implement pagination and other API features here
    .route('/')
    .get(postController.getAllPosts)
    .post(
        authController.validateJWT,
        authController.restrictsTo('admin', 'writer'),
        postController.postBlog
    )

router // this route is to get all blogs from a particular writer
    .route('/:user/authors')
    .get(
        postController.getAllWriterPosts
    )

router
    .get(
        '/myposts',
        authController.validateJWT, 
        (req, res, next)=>{
            req.params.user = req.user._id
            next();
        }
        ,postController.getAllPostsByMe
    )

router // this is to get info about a blog or patch blog only admin and original writer can make changes in a blog
    .route('/:blogid/info')
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


module.exports = router;