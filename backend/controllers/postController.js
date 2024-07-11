const PostModel = require("../model/postModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const formatRes = require('../utils/formatRes');

// to get a blog no authentication required
const getBlogByParams = catchAsync(async (req, res, next)=>{
    const blog = await PostModel.findById(req.params.blogid).populate({ // we do need to populate the comment for the 
        path: 'comments',
        select: "text"
    });

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

    if (postToUpdate.username !== req.user.username && req.user.role!=='admin') {
        return next(new AppError('You are not authorized to edit this blog', 403));
    }

    // Update the post
    const updatedPost = await PostModel.findOneAndUpdate(
        { generatedId: req.params.blogid }, // Filter
        req.body, // Updated data
        { new: true, runValidators: true } // Options: return updated document and run validators
    );

    if (!updatedPost) {
        return next(new AppError('Failed to update the blog', 500));
    }

    res.status(200).json({
        status: 'success',
        post: updatedPost // Sending the updated document back
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


const getAllWriterPosts = catchAsync(async (req, res, next)=>{
    const posts = await PostModel.aggregate([
      {
        $match: {username: req.params.username}
      }
    ])

    res.status(200).json({
        status: 'success',
        posts
    })
})


const getAllPosts = catchAsync(async (req, res, next)=>{
    const features = new APIFeatures(PostModel, req.query)
                                                        .finding()
                                                        .sorting()
                                                        .filtering()
                                                        .pagination();

    const postsAfterQueries = await features.query; // this is an array of posts
    
    // const formattedPosts = formatRes(postsAfterQueries, 'heading', 'like', 'generatedId', 'username');

    res.status(200).json({
        status: 'success',
        result: postsAfterQueries.length,
        posts: postsAfterQueries
    })

})

// to 

const sendLikedPosts = catchAsync(async(req, res, next)=>{
    
})

module.exports = { postBlog, updateBlog, getBlogByParams, deleteBlog, getAllWriterPosts , getAllPosts};
