const catchAsync = require("../utils/catchAsync");
const UserModel = require('../model/userModel');
const AppError = require("../utils/appError");
const factory = require('./handlerFactory');


// this is to protect from auto binding in which a user might update their role by submitting a post request of {role:admin} in payload
// it checks for the allowed field and only lets user update those field
const filterObj = (obj, ...allowedFields)=>{
    const newObj = {};
    Object.keys(obj).forEach(el=>{
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    })

    return newObj;
}

const getUserData = factory.getOne(UserModel, 'user', 'img username name about social'); // to get the data of the user
const getUserDataForMe = factory.getOne(UserModel, 'user', '-likedPosts -role');


// this is to update a user's data
const updateUser = catchAsync(async (req, res, next)=>{

    if (req.body.password || req.body.checkPassword){
        return next(new AppError('This route is not for password updates', 400));
    }

    // filter wanted fields name that is should be allowed to be updated
    const filterBody = filterObj(req.body, 'name', 'email', 'about', 'social', 'img');

    const updateUser = await UserModel.findByIdAndUpdate(req.user._id, filterBody, {
        new: true,
        runValidator: true
    }).select('-likedPosts -role')

    res.status(200).json({
        status: 'success',
        data: {
            user: updateUser
        }
    })
})

// this is to delete a user's data
// const deleteUser = catchAsync(async (req, res, next)=>{
//     await UserModel.findByIdAndUpdate(req.user._id, {active: false});

//     res.status(204).json({ // this is the code for deleted
//         status: 'success',
//         data: null
//     })
// })


const deleteUser = catchAsync(async (req, res, next)=>{
    await UserModel.findByIdAndDelete(req.user._id);

    res.status(204).json({
        status: 'success',
        data: null  
    })
})

const meEndpoint = (req, res, next)=>{
    req.params.user = req.user._id
    next();
}


// to get the list of all famous writer....
const getAllWriter = catchAsync(async(req, res, next)=>{
    const users = await UserModel.find({role:'writer'}).select('-email -role -likedPosts'); // const usersList = formatRes(users, 'username', 'img'); // STUPID: U could have used select in the query

    res.status(200).json({
        status: 'success',
        results: users.length,
        writers: users
    })
})

module.exports = {updateUser, deleteUser, getUserData, getAllWriter, meEndpoint, getUserDataForMe};
