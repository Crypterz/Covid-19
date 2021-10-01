const Patient=require('./../models/patientModel')

const APIfunctions=require('./../utils/apiFunctions')
const msg = require('./../utils/msg')
const catchAsync= require('./../utils/catchAsync');
const AppError = require('../utils/appError');


exports.getAllPatients = async (req, res) => {
    try{
        
        // const queryObj = {...req.query}
        // const excludeFields = ['page','sort','limit','fields']  //FLITERRING
        // excludeFields.forEach(el=>delete queryObj[el])
        // console.log(queryObj)

        // let queryStr=JSON.stringify(queryObj)                //localhost:8000/api/v1/patients?name=Nimsl&age[gte]=7
        // queryStr=queryStr.replace(/\b(gte|lte|gt|le)\b/g,match=>`$${match}`)
        // console.log(JSON.parse(queryStr))

        // let query=Patient.find(JSON.parse(queryStr))

        // if(req.query.sort){
        //     const sortBy=req.query.sort.split(',').join(' ')         //localhost:8000/api/v1/patients?age[gte]=7&sort=age,no
        //     query = query.sort(sortBy)      
        // }else{
        //     query = query.sort('-createdAt')
        // }
        
        // if(req.query.fields){
        //     const fields =req.query.fields.split(',').join(' ')
        //     query.select(fields)
        // }else{
        //     query.select('-__v')
        // }

        // const page =req.query.page*1 || 1
        // const limit=req.query.limit*1 || 100
        // const skip=(page-1)*limit
        // query=query.skip(skip).limit(limit)                    //localhost:8000/api/v1/patients?page=2&limit=10

        // if(req.query.page){
        //     const numPatient=await Patient.countDocuments()
        //     if(skip>=numPatient) throw new Error('The page is not exist')
        // }
        

        // const patients=await Patient.find().where('name').equals('nimal')
        msg.sendmsg('https://www.google.com/')
        const features=new APIfunctions(Patient.find()
        // .populate({
        //     path:'pcrTest',
        //     select:'-slug -age'
        // })
        ,req.query).filter().sort().select()
        const patients=await features.query
        res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: patients.length,
        data: {patients}
    });
    }catch(err){                 //if schema doent stisfy error may occur VALIDATIO ERROR
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
};


exports.getPatient = catchAsync(async (req, res,next) => {
    // try{
        const patient=await Patient.findById(req.params.id).populate('pcrTest')    //Patient.findOne({_id:req.params.id})
        if(!patient){
            return next(new AppError("No patient found with that ID",404))    //used return statement to avoid executing code below
        }
        res.status(200).json({
        status: 'success',
        data: {patient}
      });
    // }catch(err){                 //if schema doent stisfy error may occur VALIDATIO ERROR
    //     res.status(404).json({
    //         status:'fail',
    //         message:err
    //     })
    // }
})

exports.createPatient= catchAsync(async (req,res)=>{
    console.log(req.body)
    // const newPatient=new Patient({})
    // newPatient.save()
    // try{
        const newPatient=await Patient.create(req.body)
        res.status(201).json({
            status:'success',
            data:{
                patient:newPatient
            }
        })
    // }catch(err){                 //if schema doent stisfy error may occur VALIDATIO ERROR
    //     res.status(400).json({
    //         status:'fail',
    //         message:err
    //     })
    // }
})
exports.updatePatient=async (req,res)=>{
    try{
        const patient=await Patient.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        if(!patient){
            return next(new AppError("No patient found with that ID",404))    //used return statement to avoid executing code below
        }
        res.status(200).json({
            status:'success',
            data:{
                patient:patient
            }
        })
    }catch(err){                 //if schema doent stisfy error may occur VALIDATIO ERROR
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
}
exports.deletePatient=async (req,res)=>{
    try{
        const patient = await Patient.findByIdAndDelete(req.params.id)
        if(!patient){
            return next(new AppError("No patient found with that ID",404))    //used return statement to avoid executing code below
        }
        res.status(204).json({
            status:'success',
            data:null
        })
    }catch(err){                 //if schema doent stisfy error may occur VALIDATIO ERROR
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
}


// exports.getPatientStats = async (req, res)=>{
//     try{
//         const stats= Patient.aggregate([
//             $match:{}
//         ])
//     }catch(err){
//         res.status(404).json({
//             status:'fail',
//             message:err
//         })
//     }
// }