const PostModel = require("../model/postModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
//const formatRes = require('../utils/formatRes');

const updateBlog = factory.updateOne(PostModel, "blogid"); // to patch a blog uses params to search for blog
const deleteBlog = factory.deleteOne(PostModel, "blogid"); // to delete a blog from params


// to get a blog no authentication required
const getBlogByParams = catchAsync(async (req, res, next) => {
  const blog = await PostModel.findById(req.params.blogid).populate({
    // we do need to populate the comment for the
    path: "comments",
    select: "text",
  });

  res.status(200).json({
    status: "success",
    blog,
  });
});

// to post a blog
const postBlog = catchAsync(async (req, res, next) => {
  const newPost = await PostModel.create({
    heading: req.body.heading,
    user: req.user._id,
    body: req.body.body,
  });

  res.status(201).json({
    status: "success",
    post: newPost,
  });
});

// get all the blogs written by a writer using their id. 
const getAllWriterPosts = catchAsync(async (req, res, next) => {
  const posts = await PostModel.find({user:req.params.user}); // figure this out I want to use username not mongoose schema id

  res.status(200).json({
    status: "success",
    posts,
  });
});

const getAllPosts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(PostModel, req.query)
    .finding()
    .sorting()
    .filtering()
    .pagination();

  const postsAfterQueries = await features.query; // this is an array of posts

  // const formattedPosts = formatRes(postsAfterQueries, 'heading', 'like', 'generatedId', 'username');

  res.status(200).json({
    status: "success",
    result: postsAfterQueries.length,
    posts: postsAfterQueries,
  });
});

// to

const sendLikedPosts = catchAsync(async (req, res, next) => {});


module.exports = {
  postBlog,
  updateBlog,
  getBlogByParams,
  deleteBlog,
  getAllWriterPosts,
  getAllPosts,
};
