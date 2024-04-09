const PostModel = require("../model/postModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


// to get a blog no authentication required
const getBlogByParams = catchAsync(async (req, res, next)=>{
    const blog = await PostModel.findOne({
        generatedId: req.params.blogid
    })

    res.status(200).json({
        status: 'success',
        blog
    })
})

// to post a blog 
const postBlog = catchAsync(async (req, res, next) => {
    const newPost = await PostModel.create({
        heading: req.body.heading,
        username: req.user.username,
        body: req.body.body
    });

    res.status(201).json({
        status: 'success',
        post: newPost
    });
});


// to patch a blog uses params to search for blog
const updateBlog = catchAsync(async (req, res, next) => {
    const postToUpdate = await PostModel.findOne({
        generatedId: req.params.blogid
    });

    if (!postToUpdate) {
        return next(new AppError('Blog not found', 404));
    }

    if (postToUpdate.username !== req.user.username && req.user.role !== 'admin') {
        return next(new AppError('You are not authorized to edit this blog', 403));
    }

    const updatedPost = await postToUpdate.updateOne(req.body, {
        runValidators: true,
        new: true
    });

    res.status(200).json({
        status: 'success',
        post: updatedPost 
    });
});


// to delete a blog from params
const deleteBlog = catchAsync(async (req, res, next) => {
    const postToDelete = await PostModel.findOne({
        generatedId: req.params.blogid
    });

    if (!postToDelete) {
        return next(new AppError('Blog not found', 404));
    }

    if (postToDelete.username !== req.user.username && req.user.role !== 'admin') {
        return next(new AppError('You are not authorized to edit this blog', 403));
    }

    const updatedPost = await postToDelete.deleteOne(req.body, {
        new: true
    });

    res.status(200).json({
        status: 'success',
        msg: 'Deleted'
    });
});







module.exports = { postBlog, updateBlog, getBlogByParams, deleteBlog };
