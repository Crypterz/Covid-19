const crypto = require('crypto')
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name is required']
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase:true,
        validate:[validator.isEmail, 'Please provide valid email']
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:true,
        validate:{           //only work oncereate and save
            validator:function(el){
                return el===this.password
            }
        }
    },
    passwordChangedAt:{
        type:Date,
        default:Date.now
    },
    role:{
        type:String,
        enum:['patient','admin','medicalOfficer']
    },
    passwordResetToken: String,
    passwordResetExpire: Date
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();     //Only run this if password was modified
    this.password=await bcrypt.hash(this.password,12)
    this.passwordConfirm=undefined
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password') || this.isNew){
        return next()
    }
    this.passwordChangedAt=Date.now()-1000 //sometimes token is issue before this executed. to avoid that
    next()
})

userSchema.methods.correctPassword = async function(candidatePwd, userPwd) {
    return await bcrypt.compare(candidatePwd,userPwd)
}
userSchema.methods.changePasswordAfter = function(JWTtime){
    // console.log(this)
    // console.log(JWTtime)
    // console.log(this.passwordChangedAt.getTime()/1000)
    return (this.passwordChangedAt.getTime()/1000)>JWTtime
}

userSchema.methods.resetToken=function(){
    const resetToken=crypto.randomBytes(32).toString('hex');
    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex')
    // console.log(resetToken,this.passwordResetToken)
    this.passwordResetExpire=Date.now() + 10*60*1000  //after 10 mins password reset token get expires
    return resetToken;
}

const User=mongoose.model('User',userSchema)
module.exports=User
