const UserModel = require('../model/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const jwt = require('jsonwebtoken');

// take user id as payload header will be creating and expiration time stamps and create JWT

const createToken = id=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createAndSendJWT = (user, res, responseCode)=>{
    const token = createToken(user._id);

    res.status(responseCode).json({
        status: 'success',
        token,
        data: user
    });
}

const signup = catchAsync(async (req, res, next)=>{
    const newUser = UserModel.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        checkPassword: req.body.checkPassword
    });

    if (!newUser) return next(new AppError('User can not be created', 400));

    createAndSendJWT(newUser, res, 201);
})


const login = catchAsync(async (req, res, next)=>{
    const {email, password} = req.body;

    if (!email || !password){
        return next(new AppError('Please provide email and password', 400));
    }

    const findUser = await UserModel.findOne({email: email}).select('+password');

    if (!findUser || await findUser.){

    }
})

module.exports = {signup};