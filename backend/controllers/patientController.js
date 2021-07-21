const Patient=require('./../models/patientModel')
exports.getAllPatients = async (req, res) => {
    try{
        const queryObj = {...req.query}
        const excludeFields = ['page','sort','limit','fields']  //FLITERRING
        excludeFields.forEach(el=>delete queryObj[el])
        console.log(queryObj)

        let queryStr=JSON.stringify(queryObj)                //localhost:8000/api/v1/patients?name=Nimsl&age[gte]=7
        queryStr=queryStr.replace(/\b(gte|lte|gt|le)\b/g,match=>`$${match}`)
        console.log(JSON.parse(queryStr))

        let query=Patient.find(JSON.parse(queryStr))

        if(req.query.sort){
            const sortBy=req.query.sort.split(',').join(' ')         //localhost:8000/api/v1/patients?age[gte]=7&sort=age,no
            query = query.sort(sortBy)      
        }else{
            query = query.sort('-createdAt')
        }

        if(req.query.fields){
            const fields =req.query.fields.split(',').join(' ')
            query.select(fields)
        }else{
            query.select('-__v')
        }
        
        const patients=await query
        // const patients=await Patient.find().where('name').equals('nimal')
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
exports.getPatient = async (req, res) => {
    try{
        const patient=await Patient.findById(req.params.id)     //Patient.findOne({_id:req.params.id})
        res.status(200).json({
        status: 'success',
        data: {patient}
      });
    }catch(err){                 //if schema doent stisfy error may occur VALIDATIO ERROR
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
};

exports.createPatient= async (req,res)=>{
    // const newPatient=new Patient({})
    // newPatient.save()
    try{
        const newPatient=await Patient.create(req.body)
        res.status(201).json({
            status:'success',
            data:{
                patient:newPatient
            }
        })
    }catch(err){                 //if schema doent stisfy error may occur VALIDATIO ERROR
        res.status(400).json({
            status:'fail',
            message:err
        })
    }
}
exports.updatePatient=async (req,res)=>{
    try{
        const patient=await Patient.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
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
        await Patient.findByIdAndDelete(req.params.id)
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
