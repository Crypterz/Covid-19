const {promisify} =require('util')
const User=require('./../models/userModel')
const jwt = require('jsonwebtoken')
const catchAsync= require('./../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        // expiresIn:500
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}

exports.signup =catchAsync( async (req,res, next)=>{
        // const newUser=await User.create(req.body)  //if we go this way, any user can change other fields too. ex: type of user
        const newUser = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            passwordConfirm:req.body.passwordConfirm
        })
        const token = signToken(newUser._id)
        res.status(201).json({
            status:'success',
            token,
            data:{
                user:newUser
            }
        })
})

exports.login=catchAsync(async(req, res, next)=>{
    const {email, password}=req.body
    if(!email || !password){
        return next(new AppError('Please provide email and password',400))
    }
    const user=await User.findOne({email:email}).select('+password')
    console.log(user)
    // const correct = await user.correctPassword(password, user.password);
    if(!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password',401))
    }
    console.log(user)
    const token=signToken(user._id)
    res.status(200).json({
        status:'success',
        token
    })
})

exports.protect = catchAsync(async (req,res,next)=>{
    let token
    //1. GETTING TOKEN AND CHECK IT
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token= req.headers.authorization.split(' ')[1]
    }if(!token){
        next(new AppError('Not Logged In',401))  //401-unathorized
    }
    //2. VERIFY TOKEN
    console.log(`token - ${token}`)
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    console.error(decode)
    //3 check if user exist
    // 4. check if user chage pwd

    next()
})