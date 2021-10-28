const MedicalHistory=require('./../models/medicalHistoryModel')
const APIfunctions=require('./../utils/apiFunctions')
const catchAsync= require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const Patient=require('./../models/patientModel')


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

exports.createMedical= catchAsync(async (req,res,next)=>{
    if(!req.body.patient){
        req.body.patient=req.params.id
    }
    const patient=await Patient.findById(req.body.patient)
    if(patient.currentMedicalHistory){
        return next(new AppError("Patient already have active medical Report",404))
    }
    if(!req.body.createdBy){
        req.body.createdBy=req.user.id
    }
    req.body.hospital=req.user.hospital
    console.log(req.body)
    const medHistory=await MedicalHistory.create(req.body)
    await Patient.findByIdAndUpdate(req.body.patient,{"currentMedicalHistory":medHistory._id})
    res.status(201).json({
        status:'success',
        data:{
            test:medHistory
        }
    })
})

exports.addDrugs = catchAsync(async (req,res)=>{
    console.log(req.body)
    const medicalHistory=await MedicalHistory.findByIdAndUpdate(
        req.params.id,   
        {$push:{drugDetails:{description:req.body.description}}},
        {upsert: true}
    )
    res.status(200).json({
        status:'success',
        data:{
            medicalHistory:medicalHistory
        }
    })
})

exports.addSymptoms = catchAsync(async (req,res)=>{
    console.log(req.body)
    // const obj=req.body.map(el=>{
    //     'decription':el.
    // })
    const medicalHistory=await MedicalHistory.findByIdAndUpdate(
        req.params.id,   
        {$push:{symptoms:{description:req.body.description}}},
        {upsert: true}
    )
    res.status(200).json({
        status:'success',
        data:{
            medicalHistory:medicalHistory
        }
    })
})

// exports.update = catchAsync(async (req,res)=>{
//     await MedicalHistory.findByIdAndUpdate(req.params.id,req.body)
//     if(!medicalHistory){
//         return next(new AppError("No mediacl History found with that ID",404))    //used return statement to avoid executing code below
//     }
//     res.status(200).json({
//         status:'success',
//         data:{
//             medicalHistory:"medicalHistory"
//         }
//     })
// })

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

exports.discharge = catchAsync(async (req,res)=>{
    const patient=await Patient.findByIdAndUpdate(req.params.patientID,
        {"currentMedicalHistory":null})
    console.log(patient)
    if(!patient.currentMedicalHistory){
        return next(new AppError("Active Medical History not found for this patient",404))
    }
    const medicalHistory=await MedicalHistory.findByIdAndUpdate(
        patient.currentMedicalHistory,   
        {"dischargeDate.date":new Date()},
    )
    res.status(200).json({
        status:'success',
        data:{
            medicalHistory:medicalHistory
        }
    })
})

