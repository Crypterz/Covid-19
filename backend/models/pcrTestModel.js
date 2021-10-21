const mongoose=require('mongoose')
const slugify = require('slugify')
const Patient = require('./patientModel')
const pcrTestSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A patient must have a name'],
        unique:true
    },
    slug:String,
    age:{
        type:Number,
        required:[true, 'A patient must hae a age']
    },
    result:{
        type:String,
        enum:['positive','negative']
    },
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
        place:{
            type:mongoose.Schema.ObjectId
        }
    },
    confirm:{
        confirmBy:{
            type:String
        }
    },
    nic:{
        nicno:{
            type:Number
        },
        person:{
            
        }
    },
    contactNumber:{
        type:Number
    },
    sendStatus:{
        type:String,
        enum:['success','fail']
    }
})


pcrTestSchema.pre('save',function(next){    //RUN BEFORE  .SAVE, AND .CREATE()
    this.slug=slugify(this.name, {lower:true})
    next()
})
pcrTestSchema.post('save', function(doc,next){
    console.log("lllllllll")
    next()
})
pcrTestSchema.post('save', async function(doc,next){      //document middleware
    const test=await Patient.update(
        { "nic.nicno":this.nic.nicno},
        { "$push": { "pcrTest": this._id } })
    next()
})
pcrTestSchema.post('updateMany', function(doc,next){ 
    // console.log(doc)     //document middleware
    next()
})

// patientSchema.pre('find',function(next){   
pcrTestSchema.pre(/^find/,function(next){        //QUERY MIDDLEWARE
    this.find({confidential:{$ne:true}})                         //this refre to query we can change query object from here
    next()
})

const PCRTest=mongoose.model('PCRTest',pcrTestSchema)

module.exports=PCRTest
