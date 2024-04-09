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
    },
    generatedId:{
        type: Number,
        unique: true
    }
});

postSchema.pre('save', async function(next){
    this.generatedId = await generateUniqueId();
    next();
});

async function generateUniqueId(){
    let id;
    do{
        id = Math.floor(Math.random() * 90000 ) + 10000;
    }while (await PostModel.exists({generatedId: id}));

    return id;
}

const PostModel = mongoose.model('PostModel', postSchema); // Use mongoose.model(), not mongoose.Model()

module.exports = PostModel;
