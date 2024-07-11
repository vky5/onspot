const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    heading:{
        type: String,
        required: [true, 'Heading is required']
    },
    date: {
        type: Date,
        default: Date.now
    },
    username:{
        type: String,
        required: true 
    },
    body: {
        type: String,
        required: [true, 'Post can not be blank']
    },
    like: {
        type: Number,
        default: 0
    }
    // ,
    // generatedId:{
    //     type: Number,
    //     unique: true
    // }
    // , // but child referencing here wont work because we can have large number of comments
    // comments: [
    //     {
    //         type: String,
    //         ref: 'CommentModel'
    //     }
    // ]
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



postSchema.virtual('comments',{
    ref: 'CommentModel', // name of the model we want to reference
    foreignField: 'post', // name of the field in CommentModel where reference to the currentmodel is stored
    localField: '_id'   // here we need to tell where that ID that is used as reference like mongoose.Schema.ObjectID is stored in current model. Could have used our generatedId too
} )

// postSchema.pre('save', async function(next){
//     this.generatedId = await generateUniqueId();
//     next();
// });

// async function generateUniqueId(){
//     let id;
//     do{
//         id = Math.floor(Math.random() * 90000 ) + 10000;
//     }while (await PostModel.exists({generatedId: id}));

//     return id;
// }

const PostModel = mongoose.model('PostModel', postSchema); // Use mongoose.model(), not mongoose.Model()

module.exports = PostModel;
