const PCRTest=require('./../models/pcrTestModel')

const APIfunctions=require('./../utils/apiFunctions')
const msg = require('./../utils/msg')
const catchAsync= require('./../utils/catchAsync');
const AppError = require('../utils/appError');


exports.getAllTest = async (req, res) => {
    try{
        const features=new APIfunctions(PCRTest.find(),req.query).filter().sort().select()
        // const tests=await features.query
        // res.status(200).json({
        // status: 'success',
        // requestedAt: req.requestTime,
        // results: tests.length,
        // data: {tests}
        const pcr=await features.query
        res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: pcr.length,
        data: {pcr}
        
    });
    }catch(err){                 //if schema doent stisfy error may occur VALIDATIO ERROR
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
};

exports.createPCRTest= catchAsync(async (req,res)=>{
    const newTest=await PCRTest.create(req.body)
    res.status(201).json({
        status:'success',
        data:{
            test:newTest
        }
    })
})




// exports.getPatient = catchAsync(async (req, res,next) => {
//         const patient=await Patient.findById(req.params.id)     //Patient.findOne({_id:req.params.id})
//         if(!patient){
//             return next(new AppError("No patient found with that ID",404))    //used return statement to avoid executing code below
//         }
//         res.status(200).json({
//         status: 'success',
//         data: {patient}
//       });
// })


// exports.updatePatient=async (req,res)=>{
//     try{
//         const patient=await Patient.findByIdAndUpdate(req.params.id,req.body,{
//             new:true,
//             runValidators:true
//         })
//         if(!patient){
//             return next(new AppError("No patient found with that ID",404))    //used return statement to avoid executing code below
//         }
//         res.status(200).json({
//             status:'success',
//             data:{
//                 patient:patient
//             }
//         })
//     }catch(err){                 //if schema doent stisfy error may occur VALIDATIO ERROR
//         res.status(404).json({
//             status:'fail',
//             message:err
//         })
//     }
// }
// exports.deletePatient=async (req,res)=>{
//     try{
//         const patient = await Patient.findByIdAndDelete(req.params.id)
//         if(!patient){
//             return next(new AppError("No patient found with that ID",404))    //used return statement to avoid executing code below
//         }
//         res.status(204).json({
//             status:'success',
//             data:null
//         })
//     }catch(err){                 //if schema doent stisfy error may occur VALIDATIO ERROR
//         res.status(404).json({
//             status:'fail',
//             message:err
//         })
//     }
// }
