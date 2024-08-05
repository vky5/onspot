const express = require("express");
const tagsController = require("../controllers/tagsController");
// const authController = require("../controllers/authController");

const router = express.Router();

/*
GET /api/v1/posts/tags // to get the posts related to that tag
*/

router
    .route("/")
    .get(
        tagsController.getPostsOfTags // get posts from tags takes tag from body
    )

router.get('/gettags', tagsController.getAllTags);

module.exports = router;
