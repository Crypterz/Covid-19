const mongoose=require('mongoose')
const hospitalSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Hospital should have a name']
    },
    address:{
        district:{
            type:String,
        },
        province:{
            type:String
        },
        city:{
            type:String
        }
    },
    Contact:[{
        type:Number
    }],
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    wards:[{
        name:{
            type:String,
            required:[true,'Ward must have a name']
        },
        totalBeds:{
            type: Number,
            required:[true,'Ward must have beds count']
        },

        admittedPatients:{
            type: Number,
            required:[true,'Ward must have admitted patient count']
        },
        freeBeds:{
            type: Number,
            required:[true,'Ward must have free beds count']
        } 
    }]
})

const Hospital=mongoose.model('Hospital',hospitalSchema)
module.exports=Hospital
