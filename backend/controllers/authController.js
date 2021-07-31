const User=require('./../models/userModel')
const jwt = require('jsonwebtoken')

exports.signup = async (req,res, next)=>{
    try{
        // const newUser=await User.create(req.body)  //if we go this way, any user can change other fields too. ex: type of user
        const newUser = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            passwordConfirm:req.body.passwordConfirm
        })
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRES_IN
        })
        res.status(201).json({
            status:'success',
            token,
            data:{
                user:newUser
            }
        })
    }catch(err){        
        console.log(err)    //if schema doent stisfy error may occur VALIDATIO ERROR
        res.status(400).json({
            status:'fail',
            message:err
        })
    }

}

exports.login=async(req, res)=>{
    const {email, password}=req.body
    if(!email || !password){
        // TODO ####################################################
    }
    const user=await User.find({email:email})
    const token=''
    res.status(200).json({
        status:'success',
        token
    })

}