const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Tag must have a name']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'UserData'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Tags = mongoose.model('Tags', tagSchema);
module.exports = Tags;
