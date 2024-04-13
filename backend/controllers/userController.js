const catchAsync = require("../utils/catchAsync");
const UserModel = require('../model/userModel');
const AppError = require("../utils/appError");

const filterObj = (obj, ...allowedFields)=>{
    const newObj = {};
    Object.keys(obj).forEach(el=>{
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    })

    return newObj;
}

const updateUser = catchAsync(async (req, res, next)=>{

    if (req.body.password || req.body.checkPassword){
        return next(new AppError('This route is not for password updates', 400));
    }
    // filter unwanted fields name that is should not be allowed to be updated
    const filterBody = filterObj(req.body, 'name', 'email');

    const updateUser = await UserModel.findByIdAndUpdate(req.user._id, filterBody, {
        new: true,
        runValidator: true
    })

    res.status(200).json({
        status: 'success',
        data: {
            user: updateUser
        }
    })
})

const deleteUser = catchAsync(async (req, res, next)=>{
    await UserModel.findByIdAndUpdate(req.user._id, {active: false});

    res.status(204).json({ // this is the code for deleted
        status: 'success',
        data: null
    })
})

module.exports = {updateUser, deleteUser};
