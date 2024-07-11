const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

const deleteOne = (Model, delParams) =>
  catchAsync(async (req, res, next) => {
    // Find the document by ID
    const doc = await Model.findById(req.params[delParams]);
    console.log(doc);
    // Check if the document exists
    if (!doc) {
      return next(new AppError("No document found", 404));
    }

    //Only allow deletion if user is the owner or admin
    if (doc.user.username !== req.user.username && req.user.role !== "admin") {
      return next(
        new AppError("You are not authorized to delete this document", 403)
      );
    }

    // Perform deletion
    await Model.findByIdAndDelete(req.params[delParams]);

    res.status(204).json({
      status: "success",
    });
  });

const updateOne = (Model, updateParams) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params[updateParams]);

    if (!doc) {
      return next(new AppError("No document found", 404));
    }

    if (doc.user.username !== req.user.username && req.user.role !== "admin") {
      return next(
        new AppError("You are not authorized to update this document", 403)
      );
    }

    if (req.body["user"]) delete req.body["user"];
    // this is to prevent user from updating the comment or post username by their own. Example by directly passing someone else's monoogse Schema Id they can make it appear as if someone elsee created it

    // Update the post
    const updatedDoc = await Model.findByIdAndUpdate(
      req.params[updateParams], // Filter
      req.body, // Updated data
      { new: true, runValidators: true } // Options: return updated document and run validators
    );

    if (!updatedDoc) {
      return next(new AppError("Failed to update the blog", 500));
    }

    res.status(200).json({
      status: "success",
      data: updatedDoc, // Sending the updated document back
    });
  });

const getOne = (Model, getParams, select, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params[getParams]);
    if (popOptions) query.populate(popOptions);
    if (select) query.select(select);

    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params["blogid"]) filter = { post: req.params["blogid"] };
    const features = new APIFeatures(
      Model,
      req.query.find({
        post: req.params[paramsId],
      })
    )
      .finding()
      .sorting()
      .filtering()
      .pagination();

    const docAfterQueries = await features.query; // this is an array of document

    res.status(200).json({
      status: "success",
      result: docAfterQueries.length,
      posts: docAfterQueries,
    });
  });

module.exports = { deleteOne, updateOne, getOne, getAll };
