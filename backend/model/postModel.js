const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    heading:{
        type: String,
        required: [true, 'Heading is required']
    },
    date: {
        type: Date,
        default: Date.now()
    },
    writer:{
        type: String,
        required: true 
    },
    body: {
        type: String,
        required: [true, 'Post can not be blank']
    },
    generatedId:{
        type: Number,
        unique: true
    }
})


postSchema.pre('save', function(next){
    this.generatedId = generateUniqueId();
    next();
})

async function generateUniqueId(){
    let id;
    do{
        id = Math.floor(Math.random() * 90000 ) + 10000;
    }while (await PostModel.exists({generatedId: id}));

    return id;
}

const PostModel = mongoose.Model('PostModel', postSchema);

module.exports = PostModel;