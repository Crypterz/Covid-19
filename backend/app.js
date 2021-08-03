const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

const patientRouter=require('./routes/patientRoutes')
const userRouter=require('./routes/userRoutes')

const app=express();

//const port = 3000;

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

app.use(cors());
app.use(express.json());

app.use((req, res, next)=>{
    // console.log(req.headers)
    next()
})


app.use('/api/v1/patients',patientRouter)
app.use('/api/v1/users',userRouter)

app.all('*',(req,res,next)=>{
    // res.status(404).json({
    //     status:'fail',
    //     message:`Invaid URL - ${req.originalUrl}`
    // })
    // const err = new Error(`Invaid URL - ${req.originalUrl}`)
    // err.status = 'fail',
    // err.statusCode =404
    // next(err)      // when we pass anything as a para to next() it automatically knows that is an error

    next(new AppError(`Invaid URL - ${req.originalUrl}`,404))
})

app.use(globalErrorHandler)      //Error handling MIDDLEWARE

module.exports=app;