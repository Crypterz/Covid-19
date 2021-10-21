const Hospital=require('../models/hospitalModel')
const APIfunctions=require('../utils/apiFunctions')
const catchAsync= require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllHospitals = async (req, res) => {
    try{
        // const patients=await Patient.find().where('name').equals('nimal')
        const features=new APIfunctions(Hospital.find(),req.query).filter().sort().select()
        const hospitals=await features.query
        res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: hospitals.length,
        data: {hospitals}
    });
    }catch(err){                 //if schema doent stisfy error may occur VALIDATIO ERROR
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
};
exports.createHospital= catchAsync(async (req,res)=>{
    const newHospital=await Hospital.create(req.body)
    res.status(201).json({
        status:'success',
        data:{
            hospital:newHospital
        }
    })
})

exports.createWard= catchAsync(async (req,res)=>{
    const hospital=req.user.hospital
    console.log(hospital)
    const updatedHospital=await Hospital.findByIdAndUpdate(
        hospital,   
        {$push:{
            wards:{
                name:req.body.name,
                totalBeds:req.body.totalBeds,
            }
        }},
        // {upsert: true},
        {new: true}
    )
    res.status(201).json({
        status:'success',
        data:{
            hospital:updatedHospital
        }
    })
})

exports.updateWard= catchAsync(async (req,res)=>{
    const hospital=req.user.hospital
    const ward={}
    if(req.body.name){
        ward["wards.$.name"]=req.body.name
    }
    if(req.body.totalBeds){
        ward["wards.$.totalBeds"]=req.body.totalBeds
    }
    console.log(ward)
    console.log(hospital)
    const updatedHospital=await Hospital.findOneAndUpdate(
        { _id: hospital , "wards._id":req.params.wardId },
        { $set:ward },
        // { upsert: true },
        {new: true} 
    )
    res.status(201).json({
        status:'success',
        data:{
            hospital:updatedHospital
        }
    })
})
