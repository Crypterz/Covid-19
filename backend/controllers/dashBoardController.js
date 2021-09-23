const DashBoard=require('./../models/dashBoardModel')
const APIfunctions=require('./../utils/apiFunctions')
const catchAsync= require('./../utils/catchAsync');
const AppError = require('../utils/appError');


exports.getUser = catchAsync(async (req, res,next) => {
        const user=await Admin.findById(req.params.id) 
        if(!user){
            return next(new AppError("No user found with that ID",404))
        }
        res.status(200).json({
        status: 'success',
        data: {user}
      });
})

exports.addPCRResults=async (date,positive,negative,user)=>{
    await DashBoard.updateOne(
        {date:{
            $gt: new Date('2021-09-18'),
            $lt: new Date('2021-09-21')}},
        {
            date:'2021-09-20',
            $push:{
                cases:{
                    positive:positive,
                    negative:negative,
                    createdBy:user.name
                }
            }

        },
        {upsert: true}
    )
}

exports.getCovidStats= catchAsync(async (req,res)=>{
    const stat= Tour.aggregate([
        {
            $match:{}
        }
    ])
})