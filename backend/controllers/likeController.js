const userModel = require('../model/userModel');
const PostModel = require('../model/postModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require("../utils/appError");
const factory = require('./handlerFactory');

const getAllLikedPostsByUser = catchAsync(async (req, res, next)=>{
    const getLikedPosts = await userModel.findById(req.user._id).populate({
        path: 'likedPosts',
        select: '-body -tags'
    }).select('likedPosts');

    res.status(200).json({
        status: 'success',
        data: getLikedPosts
    })
})

// this is to like a post or unlike a post
const likeAPost = catchAsync(async (req, res, next) => {
    let counter = 0;
    const post = await PostModel.findById(req.params.blogid);
    if (!post) {
        return next(new AppError('Document not found', 404));
    }

    const user = await userModel.findById(req.user._id);
    if (!user) {
        return next(new AppError('User not found', 404));
    }

    let updatedPost;

    if (user.likedPosts.includes(req.params.blogid)) {
        // Unlike the post
        updatedPost = await PostModel.findByIdAndUpdate(
            req.params.blogid,
            { $inc: { like: -1 } }, // inc stands for increment and it is used to increase or decrease number
            { new: true, runValidators: true }
        );

        await userModel.findByIdAndUpdate(
            req.user._id,
            { $pull: { likedPosts: req.params.blogid } }, // this one's new we can directly delete from array or add new to array
            { new: true, runValidators: true }
        );
        counter-=1;

    } else {
        // Like the post
        updatedPost = await PostModel.findByIdAndUpdate(
            req.params.blogid,
            { $inc: { like: 1 } },
            { new: true, runValidators: true }
        );

        await userModel.findByIdAndUpdate(
            req.user._id,
            { $push: { likedPosts: req.params.blogid } },
            { new: true, runValidators: true }
        );

        counter+=1;
    }

    if (!updatedPost) {
        return next(new AppError('Something unexpected has happened', 500));
    }

    res.status(200).json({
        status: 'success',
        counter

    });
});


module.exports = {getAllLikedPostsByUser, likeAPost};