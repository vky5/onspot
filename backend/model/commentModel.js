const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String, 
        required: [true, 'Comment can not be blank']
    },
    username: {
        type: String,
        required: [true, 'not a valid username']
    },
    postId: {
        type: String,
        required: [true, 'must have a postid']
    },
    date: {
        type: Date,
        default: Date.now()
    }
});



const CommentModel = mongoose.model('CommentModel', commentSchema);

module.exports = CommentModel;
