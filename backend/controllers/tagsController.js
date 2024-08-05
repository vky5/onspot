// const Tags = require("../model/tagModel");
const catchAsync = require("../utils/catchAsync");
const PostModel = require("../model/postModel");
const AppError = require("../utils/appError");

const getPostsOfTags = catchAsync(async (req, res, next) => {
  if (!req.body.tags) {
    return next(new AppError("No tags specified", 400));
  }

  req.body.tags = req.body.tags.map((ele) => ele.toLowerCase());

  const posts = await PostModel.find({
    tags: { $all: req.body.tags },
  });

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

const getAllTags = catchAsync(async (req, res, next) => {
  const tags = await PostModel.aggregate([
    { $match: { status: "blogs" } }, // Match only the posts with status 'blogs'
    { $unwind: "$tags" }, // Deconstruct the tags array
    {
      $group: {
        // Group by tag to aggregate likes
        _id: "$tags", // Group by the tag name
        totalLikes: { $sum: "$like" }, // Sum the likes for each tag
      },
    },
    { $sort: { totalLikes: -1 } }, // Sort tags by total likes in descending order
    { $limit: 10 }, // Limit to the top 10 tags
    { $project: { _id: 0, tag: "$_id" } }, // Project only the tag names
  ]);

  const tagNames = tags.map((tag) => tag.tag);

  res.status(200).json({
    status: "success",
    results: tagNames.length,
    data: tagNames,
  });
});

module.exports = { getPostsOfTags, getAllTags };

// const newTag = catchAsync(async (req, res, next) => {
//   // Step 1: Take the array from the body and get all the documents where the tag name is equal to name
//   let idOfTag = {}; // this will contain all new and old ids of tags
//   const existingTags = await Tags.find({ name: { $in: req.body.tags } }).select(
//     "name _id"
//   );

//   // Step 2: Populate idOfTag with existing tags
//   existingTags.forEach((tag) => {
//     idOfTag[tag.name] = tag._id;
//   });

//   // Step 3: Filter out the tags that already exist in the DB
//   const newTagNames = req.body.tags.filter((tag) => !idOfTag[tag]);

//   // Step 4: To create a large number of tags from the given array
//   if (newTagNames.length > 0) {
//     const tagsToInsert = newTagNames.map((tag) => ({
//       name: tag,
//       user: req.user._id,
//     }));

//     const newTags = await Tags.insertMany(tagsToInsert);

//     // Step 5: Add the newly created tags to idOfTag
//     newTags.forEach((tag) => {
//       idOfTag[tag.name] = tag._id;
//     });
//   }

//   res.status(200).json({
//     status: "success",
//     data: idOfTag,
//   });
// });

// const getPostsOfTags = catchAsync(async (req, res, next) => {
//   // Ensure req.body.tags is an array of tag names
//   const tags = Array.isArray(req.body.tags) ? req.body.tags : [req.body.tags];

//   // Query posts where each post matches all provided tags
//   const posts = await PostModel.find({ tags: { $all: tags } });

//   if (posts.length === 0) {
//     return res.status(200).json({
//       status: "success",
//       result: 0,
//       data: [],
//     });
//   }

//   res.status(200).json({
//     status: "success",
//     result: posts.length,
//     data: posts,
//   });
// });
