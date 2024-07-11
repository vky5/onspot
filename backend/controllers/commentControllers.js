const CommentModel = require("../model/commentModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require('./handlerFactory');


// const postComment = factory.createOne(CommentModel, {
//   text
// })
const postComment = catchAsync(async (req, res, next) => {
  let blogid = req.params.blogid;
  if (!req.params.blogid) blogid = req.body.blogid;
  const addedComment = await CommentModel.create({
    text: req.body.text,
    user: req.user._id, // get the user from request object not from the body for security purposes
    post: blogid
  });

  if (!addedComment) {
    return next(new AppError("Something Unexpected happened", 500));
  }

  res.status(201).json({
    status: "success",
    comment: addedComment,
  });
});


const updateComment = factory.updateOne(CommentModel, 'commentid'); // to update the comment from commentid
const deleteComment = factory.deleteOne(CommentModel, 'commentid'); // to delete comment from commentid 

const getCommentsForUser = catchAsync(async (req, res, next) => {
  const allComments = await CommentModel.find({
    user: req.user._id,
  });

  res.status(200).json({
    status: "success",
    comments: allComments,
  });
});


// if we do not pass anything in params or body then we will get all comments
const getCommentForPost = catchAsync(async (req, res, next) => {
  let blogid = req.params.blogid;
  if (!blogid) blogid = req.body.blogid;

  const allComments = await CommentModel.find({
    post: blogid,
  });

  res.status(200).json({
    status: "success",
    comments: allComments,
  });
});

const getParticularComment = catchAsync(async (req, res, next) => {
  const getComment = await CommentModel.findById(req.params.commentid);

  if (!getComment) return next(new AppError("No Comment found", 400));
  res.status(200).json({
    status: "success",
    comment: getComment,
  });
});

module.exports = {
  postComment,
  updateComment,
  deleteComment,
  getCommentsForUser,
  getCommentForPost,
  getParticularComment,
};

