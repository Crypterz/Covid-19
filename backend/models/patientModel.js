const mongoose=require('mongoose')
const patientSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A patient must have a name'],
        unique:true
    },
    age:{
        type:Number
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    }
})
const Patient=mongoose.model('Patient',patientSchema)

module.exports=Patient


//12 Vid