const PostModel = require("../model/postModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

// created by handler factory
const updateBlog = factory.updateOne(PostModel, "blogid"); // to patch a blog uses params to search for blog
const deleteBlog = factory.deleteOne(PostModel, "blogid"); // to delete a blog from params
const getBlogByParams = factory.getOne(PostModel, "blogid", null, "comments"); // to get the blog from its id and also populate the comments
const getAllPosts = factory.getAll(PostModel,  "-body -tags", { $or: [{ status: "projects" }, { status: "blogs" }]}); // all post related pagination here

// to post a blog
const postBlog = catchAsync(async (req, res, next) => {
  const newPost = await PostModel.create({
    heading: req.body.heading,
    user: req.user._id,
    body: req.body.body,
    tags: req.body.tags,
    img: req.body.img,
  });

  res.status(201).json({
    status: "success",
    post: newPost,
  });
});

// get all the blogs written by a writer using their id.
const getAllWriterPosts = catchAsync(async (req, res, next) => {
  const posts = await PostModel.find({
    user: req.params.user,
    $or: [{ status: "projects" }, { status: "blogs" }],
  }).select("-body -tags");

  if (posts.length === 0) {
    return res.status(200).json({
      status: "success",
      result: 0,
      data: [],
    });
  }

  res.status(200).json({
    status: "success",
    result: posts.length,
    data: posts,
  });
});

// get all the blogs written by a writer using their id.
const getAllPostsByMe = catchAsync(async (req, res, next) => {
  const posts = await PostModel.find({
    user: req.params.user
  }).select("-body -tags");

  if (posts.length === 0) {
    return res.status(200).json({
      status: "success",
      result: 0,
      data: [],
    });
  }

  res.status(200).json({
    status: "success",
    result: posts.length,
    data: posts,
  });
});

module.exports = {
  postBlog,
  updateBlog,
  getBlogByParams,
  deleteBlog,
  getAllWriterPosts,
  getAllPosts,
  getAllPostsByMe
};
