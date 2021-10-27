const DashBoard=require('./../models/dashBoardModel')
const APIfunctions=require('./../utils/apiFunctions')
const catchAsync= require('./../utils/catchAsync');
const AppError = require('../utils/appError');


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


exports.publicDashBoard= catchAsync(async (req,res,next)=>{
    const d = new Date()
    const today=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`.toString()
    const total = await DashBoard.findOne({},{},{ sort: { 'date' : -1 } }).select('totalActiveCases totalRecovered totalDeaths districtTotals ');
    const all = await DashBoard.find().select('totalActiveCases date -_id')
    res.status(200).json({
        status:'success',
        data:{
           all,
           total
        }
    })
})