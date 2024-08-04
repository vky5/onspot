const UserData = require('../model/userModel');
const UserModel = require('../model/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/email');
const crypto = require('crypto');
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

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        // secure: true, // this will send cookie only in https connection
        httpOnly: true // browser will recieve the cookie store it and send it back with every request
    }

    if (process.env.NODE_ENV==='production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions)
    user.password = undefined;
    res.status(responseCode).json({
        status: 'success',
        token
        // data: user
    });
}

// create the user and save data in DB
const signup = catchAsync (async (req, res, next) => {
    const newUser = await UserModel.create({ // we cant create a payload directly from the user browser 
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        img: req.body.img
        // checkPassword: req.body.checkPassword
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
    if (!findUser){
        return next(new AppError('Incorrect email or password', 401));
    }
    const ans = await findUser.correctPassword(password, findUser.password); // this returns a promise and we need to await
    // here it is giving us error that we are trying to find the password on a null object therefore we need to resolve if we found user or not

    if (!ans){
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
        return next(new AppError('You are not logged in!', 401));
    }

    // validationg token
    const verifyToken = util.promisify(jwt.verify);
    const decoded = await verifyToken(token, process.env.JWT_SECRET); // if signature not verified throws an error catched by catch in catchAsync

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

// this is to restrict user routes to particular roles 
const restrictsTo = (...roles)=>{
    return (req, res, next)=>{
        if (!roles.includes(req.user.role)){
            return next(new AppError('You are not authorized to access this route', 403));
        }
    
        next();
    }
}

// to generate and send a token when user forget password
const forgotPassword = catchAsync(async (req, res, next)=>{
    const user = await UserData.findOne({email: req.body.email});
    if (!user) return next (new AppError('Email does not exists in the database', 404)); // but this way someone can know if the email that they have is valid or not

    // 2) generate reset token
    const resetToken = user.createPasswordResetToken(); // because we are only updating the field in user document and not saving it
    await user.save({
        validateBeforeSave: false // this deactivates all validatiorss in schema
    });

    // 3) send it to user's email

    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`

    const message = `If you have forget your password change your password on the url given at ${resetURL}\nif you didn't forget your password, please ignore this email`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token {valid for 10 min}',
            message
        })
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save({
            validateBeforeSave: false
        })
        return next(
            new AppError('Something went wrong in server side', 500)
        )
    }


    res.status(200).json({
        status:'success',
        message: 'Token sent to email'
    })
})

const resetPassword = catchAsync (async (req, res, next)=>{
    // 1) get user based on token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await UserModel.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {$gt: Date.now()} // 2) if token has not expired and there is user, set the new password
    });

    if (!user) return next (new AppError('Token is invalid or has expired', 400));

    // 3) update changedPasswordAt property for the user done as middleware in userData
    user.password = req.body.password;
    user.checkPassword = req.body.checkPassword;

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save(); // here we used save not update because we need validators to run to confirm password

    // 4) Log the user in, send JWT

    createAndSendJWT(user, res, 200);
})


const updatePassword = catchAsync (async (req, res, next)=>{
    // 1) get user from collection
    const user = await UserModel.findById(req.user._id).select('+password');
    if (!user) return next(new AppError("The user does not exists",  404));

    // 2) check if posted current password is correct
    const ans = await user.correctPassword(req.body.password, user.password);

    if (!ans){
        return next(new AppError('Incorrect password', 401));
    }
    // 3) update password
    user.password = req.body.newPassword;
    // user.checkPassword = req.body.newCheckPassword

    await user.save();

    // 4) log user in and send JWT
    createAndSendJWT(user, res, 200);
})

module.exports = {signup, login, validateJWT, restrictsTo, forgotPassword, resetPassword, updatePassword};