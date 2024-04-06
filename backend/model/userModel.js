const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter a Username']
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 8,
        select: false
    },
    checkPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (el){
                return el==this.password;
            },
            message: "Passwords are not the same"
        }
    },
    role: {
        type: String,
        enum: ['admin', 'writer', 'reader'],
        default: 'reader'
    },
    date: {
        type: Date,
        default: Date.now
    }
})



userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();

    //hash the password
    this.password = await bcrypt.hash(this.password, 12);

    //delete the checkpassword field
    this.checkPassword = undefined;
    next();
})


userSchema.methods.correctPassword = async function(password, actualPassword){
    return await bcrypt.compare(password, actualPassword);
}

const UserData = mongoose.model('UserData', userSchema);
module.exports = UserData;