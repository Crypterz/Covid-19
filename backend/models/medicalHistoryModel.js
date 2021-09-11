const mongoose=require('mongoose')
const medicalHistorySchema=new mongoose.Schema({
    symptoms:[{
        date:{
            type:Date,
            default:Date.now()
        },
        description:{
            type:String
        }
    }],
    drugDetails:[{
        date:{
            type:Date,
            default:Date.now()
        },
        description:{
            type:String
        },
    }],
    admittedDate:{
        type:Date,
        default:Date.now
    },
    dischargeDate:{
        date:{
            type:Date
        },
        changed:{
            type:Boolean,
            default:false
        }
    }
})

const MedicalHistory=mongoose.model('MedicalHistory',medicalHistorySchema)
module.exports=MedicalHistory