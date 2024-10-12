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
    },
    upvotes: {
        type: Number,
        default: 0
    }
}, {
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret.id;
        }
    },
    toObject: {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret.id;
        }
    }
});


// A unique problem has arised since it will populate the comment anywhere it finds a find function like handler factory for deleteOne it will populate user without its id.
// now we can handle this situation easily since we are populating username by checking uniqueness of username

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
        select: 'username img'
    })

    next();
})

const CommentModel = mongoose.model('CommentModel', commentSchema);

module.exports = CommentModel;


// this should have two references the post it is the comment of and the user who rote that comment