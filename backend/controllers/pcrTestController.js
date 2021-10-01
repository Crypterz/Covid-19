const PCRTest=require('./../models/pcrTestModel')
const dashBoard=require('./../models/dashBoardModel')
const APIfunctions=require('./../utils/apiFunctions')
const msg = require('./../utils/msg')
const catchAsync= require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const dashBoardController = require('./dashBoardController')


exports.getAllTest = async (req, res) => {
    //console.log(req.body)
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
    }catch(err){                 //if schema doesnt stisfy error may occur VALIDATION ERROR
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
};

exports.createPCRTest= catchAsync(async (req,res)=>{
    req.body.creation={
        createdBy:req.user.name
    }
    const r=req.body
    const newTest=await PCRTest.create(r)
    res.status(201).json({
        status:'success',
        data:{
            test:newTest
        }
    })
})

exports.confirmPCRTest=catchAsync(async (req,res)=>{
    const test=await PCRTest.updateMany({_id:{
        $in:req.body.ids
    }},{
        confirm:{confirmBy:req.user.name}
    })
    const positive =await PCRTest.where({confirm:{$exists:true},_id:{$in:req.body.ids}, result:"positive"}).countDocuments();
    const negative =await PCRTest.where({confirm:{$exists:true},_id:{$in:req.body.ids}, result:"negative"}).countDocuments();
    // await dashBoard.create({
    //     positive:positive,
    //     negative:negative,
    //     creation:req.user
    // })
    await dashBoardController.addPCRResults(Date.now(),4,5,req.user)
    if(!test){
        return next(new AppError("No patient found with that ID",404))    //used return statement to avoid executing code below
    }
    res.status(200).json({
        status:'success',
        data:{
            test
        }
    })
})