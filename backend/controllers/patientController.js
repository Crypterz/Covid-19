const Patient=require('./../models/patientModel')
exports.getAllPatients = async (req, res) => {
    try{
        const queryObj = {...req.query}
        const excludeFields = ['page','sort','limit','fields']
        excludeFields.forEach(el=>delete queryObj[el])
        console.log(queryObj)
        const patients=await Patient.find(queryObj)
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
