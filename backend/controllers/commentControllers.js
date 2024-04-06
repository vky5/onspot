const CommentModel = require('../model/commentModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const postComment = catchAsync(async (req, res, next)=>{
    const addedComment = await CommentModel.create({
        text: req.body.text,
        username: req.user.username, // get the user from request object
        postId: req.params.blogid
    });

    if (!addedComment){ return next(new AppError('Something Unexpected happened', 500))};

    res.status(201).json({
        status: 'success',
        comment: addedComment
    })
})

const updateComment = catchAsync(async (req, res, next) => {
    const updateComment = await CommentModel.findByIdAndUpdate(
        req.body._id, // Assuming _id is used as the identifier
        { text: req.body.text }, // Updating the text field
        { runValidators: true, new: true } // Options to run validators and return the new document
    );

    if (!updateComment) return next(new AppError('No comment found', 400));

    res.status(200).json({
        status: 'success',
        comment: updateComment
    });
});


module.exports = {postComment, updateComment};