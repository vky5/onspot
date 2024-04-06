const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    heading:{
        type: String,
        required: [true, 'Heading is required']
    },
    body: {
        type: String,
        required: [true, 'Post can not be blank']
    }
})


const PostModel = mongoose.Model('PostModel', postSchema);

module.exports = PostModel;