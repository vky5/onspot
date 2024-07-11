const CommentModel = require("../model/commentModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require('./handlerFactory');


const postComment = catchAsync(async (req, res, next) => {
  let blogid = req.params.blogid;
  if (!req.params.blogid) blogid = req.body.blogid;
  const addedComment = await CommentModel.create({
    text: req.body.text,
    user: req.user._id, // get the user from request object
    post: blogid,
  });

  if (!addedComment) {
    return next(new AppError("Something Unexpected happened", 500));
  }

  res.status(201).json({
    status: "success",
    comment: addedComment,
  });
});

const updateComment = catchAsync(async (req, res, next) => {
  const updateComment = await CommentModel.findByIdAndUpdate(
    req.params.commentid,
    { text: req.body.text },
    { runValidators: true, new: true }
  );

  if (!updateComment) return next(new AppError("No comment found", 400));
  if (updateComment.user !== req.user._id && req.user.role !== "admin")
    return next(
      new AppError("You are not authorized to make these changes", 403)
    );

  res.status(200).json({
    status: "success",
    comment: updateComment,
  });
});


// const deleteComment = factory.deleteOne(CommentModel, 'commentid');


const deleteComment = catchAsync(async (req, res, next) => {
  const deleteComment = await CommentModel.findByIdAndDelete(
    req.params.commentid
  );

  if (!deleteComment) {
    return next(new AppError("No comment found", 400));
  }
  if (updateComment.user !== req.user._id && req.user.role !== "admin")
    return next(
      new AppError("You are not authorized to make these changes", 403)
    );

  res.status(204).json({
    status: "success",
    deletedComment: deleteComment,
  });
});

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

