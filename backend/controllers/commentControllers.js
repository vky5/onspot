const CommentModel = require("../model/commentModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require('./handlerFactory');

// created by factory handlers
const updateComment = factory.updateOne(CommentModel, 'commentid'); // to update the comment from commentid
const deleteComment = factory.deleteOne(CommentModel, 'commentid'); // to delete comment from commentid 
const getParticularComment = factory.getOne(CommentModel, 'commentid'); // this is to get a particular comment from using commentId
const getCommentForPost = factory.getAll(CommentModel,'-post',{} ,'blogid'); // if we do not pass anything in params or body then we will get all comments with pagination rules set as default
const getCommentsForMe = factory.getAll(CommentModel, '-post', {},  "blogid", "user")


const transferToParams = (req, res, next) =>{
  if (!req.params.blogid) req.params.blogid = req.body.blogid;
  // if (!req.params.commentid) req.params.commentid = req.body.commentid // no need actually because we never need to pass comment id in body in any case
  next();
}

const postComment = catchAsync(async (req, res, next) => {
  let blogid = req.params.blogid;
  if (!req.params.blogid) blogid = req.body.blogid;

  if (!blogid){
    return next(new AppError('No blog id specified', 400));
  }

  const addedComment = await CommentModel.create({
    text: req.body.text,
    user: req.user._id, // get the user from request object not from the body for security purposes
    post: blogid,
    repliedTo: req.body.replied
  });

  if (!addedComment) {
    return next(new AppError("Something Unexpected happened", 500));
  }

  res.status(201).json({
    status: "success"
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


module.exports = {
  postComment,
  updateComment,
  deleteComment,
  getCommentsForUser,
  getCommentForPost,
  getParticularComment,
  getCommentsForMe,
  transferToParams
};

