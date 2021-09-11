const mongoose=require('mongoose')
const slugify = require('slugify')
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
    }
})


pcrTestSchema.pre('save',function(next){    //RUN BEFORE  .SAVE, AND .CREATE()
    this.slug=slugify(this.name, {lower:true})
    console.log(this)
    next()
})
pcrTestSchema.post('save', function(doc,next){
    console.log("pre fin post")
    next()
})
pcrTestSchema.post('save', function(doc,next){      //document middleware
    console.log(doc)
    next()
})

// patientSchema.pre('find',function(next){   
pcrTestSchema.pre(/^find/,function(next){        //QUERY MIDDLEWARE
    this.find({confidential:{$ne:true}})                                 //this refre to query we can change query object from here
    next()
})

const PCRTest=mongoose.model('PCRTest',pcrTestSchema)

module.exports=PCRTest
