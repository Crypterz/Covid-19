const User=require('./../models/userModel')
const APIfunctions=require('./../utils/apiFunctions')
const catchAsync= require('./../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllUsers = catchAsync(async (req, res) => {
        const users=await User.find()
        res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: users.length,
        data: {users}
    });
})