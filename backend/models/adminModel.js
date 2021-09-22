const mongoose=require('mongoose')
const slugify = require('slugify')
const adminSchema =new mongoose.Schema({
    name:{
        firstName:{
            type:String,
            required:[true,'A user should enter first name'],
        },
       lastName:{
        type:String,
        required:[true,'A user should enter last name'],
       }
    },
    // doB:{
    //     type:Date,
    //     required:[true,'A user should enter birthday'],
    // },
    nic:{
        type:Number,
        required:[true,'A user should have unique NIC'],
        unique:true,
        length:12
    },
    slug:String,
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    location:{
        type:{
            type:String,
            default:'Point',
            enum:['Point']
        },
        cordinates:[Number],
        address:String
    },
    creation:{
        createdBy:{
            type:String
        },
        createdAt:{
            type:Date,
            default:Date.now(),
            select:false
        }
    }
})

  
adminSchema.pre(/^find/,function(next){        //QUERY MIDDLEWARE
    this.find({confidential:{$ne:true}})                                 //this refre to query we can change query object from here
    next()
})

const Admin=mongoose.model('Admin',adminSchema)

module.exports=Admin
