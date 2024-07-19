const express = require("express");
const tagsController = require("../controllers/tagsController");
// const authController = require("../controllers/authController");

const router = express.Router();

/*
GET /api/v1/tags // to get the posts related to that tag
*/

router
    .route("/")
    .get(
        tagsController.getPostsOfTags // this takes ID of the tag not name of the tag
    )

module.exports = router;
