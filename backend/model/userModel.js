const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: [true, 'Enter a name'] we dont need to make it mandatory since we are using username as primary form of recognization
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    about: {
        type: String
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
    role: {
        type: String,
        enum: ['admin', 'writer', 'reader'],
        default: 'writer'
    },
    passwordChangedAt:{
        type: Date,
        select: false
    },
    img: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    likedPosts: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "PostModel"
        }
    ],
    social: {
        linkdin: {
            type: String,
        },
        twitter: {
            type: String,
        },
        github: {
            type: String,
        }
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
})




userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();

    //hash the password
    this.password = await bcrypt.hash(this.password, 12);

    next();
})

userSchema.pre('save', function(next){
    if (!this.isModified('password') || this.isNew) return next();
     
    this.passwordChangedAt = Date.now() - 1000; 
    // sometimes the new Token is generated way too soon before the timestamp for password change is created so we need to subtract some time from that timestamp
    next();

})

userSchema.pre(/^find/, function(next){
    this.find({active: {$ne: false}}) // this is the middleware that will run before every find query and it will pass an extra query in which active must be true or not equals false 
    next()
})

userSchema.methods.correctPassword = async function(password, actualPassword){
    return await bcrypt.compare(password, actualPassword);
}



userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    const passwordChangedAt = this.passwordChangedAt
    if (passwordChangedAt){
        const changedTimeStamp = parseInt(passwordChangedAt.getTime()/1000, 10);

        return JWTTimestamp < changedTimeStamp;
    } 

    return false
}

userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const UserData = mongoose.model('UserData', userSchema);
module.exports = UserData;