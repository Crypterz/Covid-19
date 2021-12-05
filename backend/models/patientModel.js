const mongoose=require('mongoose')
const slugify = require('slugify')
const patientSchema =new mongoose.Schema({

    createdAt:{
        type:Date,
        default:Date.now,
        select:false
    },
    pcrTest:[{
        type:mongoose.Schema.ObjectId,
        ref: 'PCRTest'
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User'
    },
    nic:{
        nicno:{
            type:String,
            required:[true,'A user should have unique NIC']
        },
        person:{
            type:String
        }
    },
    medicalHistory:[{
        type:mongoose.Schema.ObjectId,
        ref:'MedicalHistory'
    }],
    currentMedicalHistory:{
        type:mongoose.Schema.ObjectId,
        ref:'MedicalHistory'
    },
    confidential:Boolean
// },{
//     toJSON:{virtuals:true},
//     toObject:{virtuals:true}
})


patientSchema.post('save', function(doc,next){
    // console.log("pre fin post")
    next()
})
patientSchema.post('save', function(doc,next){      //document middleware
    // console.log(doc)
    next()
})

// patientSchema.pre('find',function(next){   
patientSchema.pre(/^find/,function(next){        //QUERY MIDDLEWARE
    this.find({confidential:{$ne:true}})                                 //this refre to query we can change query object from here
    next()
})

patientSchema.pre(/^find/,function(next){        //QUERY MIDDLEWARE
    this.populate({
        path:'pcrTest',
        select:'-slug -age'
    })                                 //this refre to query we can change query object from here
    next()
})

patientSchema.index({nic: 1}, {unique: true});

const Patient=mongoose.model('Patient',patientSchema)

module.exports=Patient


//12 Vid