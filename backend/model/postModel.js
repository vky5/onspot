const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    heading:{
        type: String,
        required: [true, 'Heading is required']
    },
    tags: [{
        type: String
    }],
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'UserData'
    },
    body: {
        type: String,
        required: [true, 'Post can not be blank']
    },
    like: {
        type: Number,
        default: 0
    },
    img: {
        type: String
    },
    status: {
        type: String,
        enum: ['moderation', 'blogs', 'projects', 'rejected'],
        default: 'moderation'
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


// to save all the lowercase
postSchema.pre('save', function(next){
    this.tags = this.tags.map(ele => ele.toLowerCase());
    next();
});


// to add comments to the Posts
postSchema.virtual('comments',{
    ref: 'CommentModel', // name of the model we want to reference
    foreignField: 'post', // name of the field in CommentModel where reference to the currentmodel is stored
    localField: '_id'   // here we need to tell where that ID that is used as reference like mongoose.Schema.ObjectID is stored in current model. Could have used our generatedId too
} )

// to populate the user and tags from the DB
postSchema.pre(/^find/, function(next){
    this.populate({
        path: 'user',
        select: 'username img'
    })
    // .populate({ // we want this to show which tag is the post assigned with in form of array..
    //     path: 'tags',
    //     select: 'name'
    // })

    next();
})


const PostModel = mongoose.model('PostModel', postSchema); // Use mongoose.model(), not mongoose.Model()

module.exports = PostModel;
