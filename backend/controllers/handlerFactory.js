const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

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

    if (
      doc.user.username !== req.user.username &&
      req.user.role !== "admin"
    ) {
      return next(
        new AppError("You are not authorized to update this document", 403)
      );
    }

    // Update the post
    const updatedDoc = await Model.findByIdAndUpdate(
      req.params[updateParams] , // Filter
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

module.exports = { deleteOne, updateOne };
