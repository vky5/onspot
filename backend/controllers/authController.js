const UserData = require('../model/userModel');
const UserModel = require('../model/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const jwt = require('jsonwebtoken');
const util = require('util')

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

// create the user and save data in DB
const signup = catchAsync (async (req, res, next) => {
    const newUser = await UserModel.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        checkPassword: req.body.checkPassword
    });
    
    if (!newUser){
        return next(new AppError('User can not be created', 400));
    }
      
    createAndSendJWT(newUser, res, 201);
});


// send login to the user
const login = catchAsync(async (req, res, next)=>{
    const {email, password} = req.body;

    if (!email || !password){
        return next(new AppError('Please provide email and password', 400));
    }

    const findUser = await UserModel.findOne({email: email}).select('+password');
    const ans = await findUser.correctPassword(password, findUser.password); // this returns a promise and we need to await

    if (!findUser || !ans){
        return next(new AppError('Incorrect email or password', 401)) // unauthorized)
    }
    
    createAndSendJWT(findUser, res, 200);
})

// for creating the protected routes
const validateJWT = catchAsync(async(req, res, next)=>{

    // checking if token is present or not
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token){
        return next(new AppError('You are not loggedd in!', 401));
    }

    // validationg token

    const verifyToken = util.promisify(jwt.verify);
    const decoded = await verifyToken(token, process.env.JWT_SECRET);

    //to check if user still exists in DB
    const user = await UserData.findById(decoded.id);
    if (!user){
        return next(new AppError('The user no longer exists', 401));
    }

    if (user.changedPasswordAfter(decoded.iat)){
        return next(new AppError('User recently changed password! Please log in again', 401));
    }

    req.user = user;

    next();
    
})

module.exports = {signup, login, validateJWT};