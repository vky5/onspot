const express = require("express");
const tagsController = require("../controllers/tagsController");
const authController = require("../controllers/authController");

const router = express.Router();

/*
POST /api/v1/tags // to create a tag and also to check if the tag already exists and return _id
GET /api/v1/tags // to get the posts related to that tag
*/

router
    .route("/")
    .get(
        tagsController.getPostsOfTags // this takes ID of the tag not name of the tag
    )
    .post(
        authController.validateJWT, 
        tagsController.newTag //use this to get ID of the tag name
    );

module.exports = router;
