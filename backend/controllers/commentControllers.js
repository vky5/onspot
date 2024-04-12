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
        req.params.commentid, 
        { text: req.body.text }, 
        { runValidators: true, new: true } 
    );

    if (!updateComment) return next(new AppError('No comment found', 400));
    if (updateComment.username!==req.user.username && req.user.role!=='admin') return next(new AppError('You are not authorized to make these changes', 403))

    res.status(200).json({
        status: 'success',
        comment: updateComment
    });
});


const deleteComment = catchAsync(async (req, res, next)=>{
    const deleteComment = await CommentModel.findByIdAndDelete(req.params.commentid);

    if (!deleteComment){
        return next(new AppError('No comment found', 400));
    }
    if (updateComment.username!==req.user.username && req.user.role!=='admin') return next(new AppError('You are not authorized to make these changes', 403))

    res.status(200).json({
        status: 'success',
        deletedComment: deleteComment
    })
})

const getCommentsForUser = catchAsync(async (req, res, next)=>{
    const allComments = await CommentModel.aggregate([
        {
            $match: {username : req.user.username}
        },{
            $project: {
                text: 1
            }
        }
    ])

    res.status(200).json({
        status: 'success',
        comments: allComments
    })
})

const getCommentForPost = catchAsync(async (req, res, next) => {
    const allComments = await CommentModel.aggregate([
        {
            $match: { postId: req.params.blogid } 
        },
        {
            $lookup: {
                from: 'userdatas', 
                localField: 'username',
                foreignField: 'username',
                as: 'user' 
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: { 
                _id: 0, 
                commentId: 1,
                text: 1,
                postId: 1,
                'user.username': 1,
                'user.name': 1 
            }
        }
    ]);

    res.status(200).json({
        status: 'success',
        comments: allComments
    });
});


module.exports = {postComment, updateComment, deleteComment, getCommentsForUser, getCommentForPost};

// the beautiful thing about this is you will only have access to mongoDB ids of comments for your own comments