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
    wards:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Ward'
        }
    ]

})

const Hospital=mongoose.model('Hospital',hospitalSchema)
module.exports=Hospital
