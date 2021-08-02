module.exports=(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;  //500-Internal sever error
    err.status = err.status || 'error'

    if(process.env.NODE_ENV==='development'){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message,
            stack:err.stack
        })
    }else if(err.isOperational){                 // Operationa error- errors happen due to wrong querie/ not a mistake of a programmer
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message
        })
    }else{
        res.status(500).json({   //Error happen due to programmers mistakes / non intential
            status:'error',
            message:'Something went wrong...'
        })
    }

    
}