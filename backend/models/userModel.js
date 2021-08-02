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
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();     //Only run this if password was modified
    this.password=await bcrypt.hash(this.password,12)
    this.passwordConfirm=undefined
});

userSchema.methods.correctPassword = async function(candidatePwd, userPwd) {
    return await bcrypt.compare(candidatePwd,userPwd)
}
userSchema.methods.changePasswordAfter = function(JWTtime){
    console.log(JWTtime)
    console.log(this.passwordChangedAt)
    console.log(this.passwordChangedAt.getTime()/1000)
    return (this.passwordChangedAt.getTime()/1000)>JWTtime
}

const User=mongoose.model('User',userSchema)
module.exports=User