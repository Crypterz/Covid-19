const User=require('./../models/userModel')
const APIfunctions=require('./../utils/apiFunctions')
const catchAsync= require('./../utils/catchAsync');
const AppError = require('../utils/appError');

exports.updateUserInformation=catchAsync(async (req,res)=>{
    const user=await Patient.findByIdAndUpdate(req.user._id,req.body,{
        new:true,
        runValidators:true
    })
    if(!user){
        return next(new AppError("User not found",404))    //used return statement to avoid executing code below
    }
    res.status(200).json({
        status:'success',
        data:{
            user
        }
    });
})

// exports.getAllUsers = catchAsync(async (req, res) => {
//         const users=await User.find()
//         res.status(200).json({
//         status: 'success',
//         requestedAt: req.requestTime,
//         results: users.length,
//         data: {users}
//     });
// })

// exports.createUser= catchAsync(async (req,res)=>{
//     const newUser=await User.create(req.body)
//     res.status(201).json({
//         status:'success',
//         data:{
//             user:newUser
//         }
//     })
// })

exports.getAllUsers = catchAsync(async (req, res) => {
    const users=await User.find()
    res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: users.length,
    data: {users}
});
})

exports.createUser= catchAsync(async (req,res)=>{
const newUser=await User.create(req.body)
res.status(201).json({
    status:'success',
    data:{
        user:newUser
    }
})
})