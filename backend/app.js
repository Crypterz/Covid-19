const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
//import cors from 'cors';

const patientRouter=require('./routes/patientRoutes')

const app=express();

const allowedOrigins = ['http://localhost:3000'];
const options= cors.CorsOptions = {
  origin: allowedOrigins
};

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

// app.use(cors);
 app.use(cors(options));
app.use(express.json());


app.use('/api/v1/patients',patientRouter)

module.exports=app;