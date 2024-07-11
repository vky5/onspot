const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String, 
        required: [true, 'Comment can not be blank']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "UserData",
        required: [true, "Must be written by a user"]
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: "PostModel",
        required: [true, "Comment must belong to a post"]
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

commentSchema.pre(/^find/, function(next){
    // this.populate({
    //     path: 'user',
    //     select: 'username'
    // }).populate({
    //     path: 'post',
    //     select: "generatedId heading username"
    // })

    this.populate({
        path: 'user',
        select: 'username -_id'
    })

    next();
})

const CommentModel = mongoose.model('CommentModel', commentSchema);

module.exports = CommentModel;


// this should have two references the post it is the comment of and the user who rote that comment