const MedicalHistory=require('./../models/medicalHistoryModel')
const APIfunctions=require('./../utils/apiFunctions')
const catchAsync= require('./../utils/catchAsync');
const AppError = require('../utils/appError');


// exports.getAllTest = async (req, res) => {
//     try{
//         const features=new APIfunctions(PCRTest.find(),req.query).filter().sort().select()
//         const tests=await features.query
//         res.status(200).json({
//         status: 'success',
//         requestedAt: req.requestTime,
//         results: tests.length,
//         data: {tests}
//     });
//     }catch(err){                 //if schema doent stisfy error may occur VALIDATIO ERROR
//         res.status(404).json({
//             status:'fail',
//             message:err
//         })
//     }
// };

exports.createMedical= catchAsync(async (req,res)=>{
    if(!req.body.patient){
        req.body.patient=req.params.id
    }
    if(!req.body.createdBy){
        req.body.createdBy=req.user.id
    }
    req.body.hospital=req.user.hospital
    const medHistory=await MedicalHistory.create(req.body)
    res.status(201).json({
        status:'success',
        data:{
            test:medHistory
        }
    })
})

exports.addSymtomsDrugs = catchAsync(async (req,res)=>{
    console.log(req.body)
    await MedicalHistory.findByIdAndUpdate(
        req.params.id,   
        {$push:{drugDetails:{description:"kkkk"}}},
        {upsert: true}
    )
    res.status(200).json({
        status:'success',
        data:{
            medicalHistory:"medicalHistory"
        }
    })
})

exports.update = catchAsync(async (req,res)=>{
    await MedicalHistory.findByIdAndUpdate(req.params.id,req.body)
    if(!medicalHistory){
        return next(new AppError("No mediacl History found with that ID",404))    //used return statement to avoid executing code below
    }
    res.status(200).json({
        status:'success',
        data:{
            medicalHistory:"medicalHistory"
        }
    })
})

exports.getMedicalHistory = catchAsync(async (req, res,next) => {
    const med=await MedicalHistory.findById(req.params.id)    //Patient.findOne({_id:req.params.id})
    if(!med){
        return next(new AppError("No meical History found with that ID",404))    //used return statement to avoid executing code below
    }
    res.status(200).json({
    status: 'success',
    data: {med}
    });
})

exports.getAllMedicalHistory = catchAsync(async (req, res, next) => {
    let id;
    if(req.params.id){
        id=req.params.id
    }else{
        id=req.user._id
    }
    const med=await MedicalHistory.findById(id)    //Patient.findOne({_id:req.params.id})
    if(!med){
        return next(new AppError("No meical History found with that ID",404))    //used return statement to avoid executing code below
    }
    res.status(200).json({
    status: 'success',
    data: {med}
    });
})