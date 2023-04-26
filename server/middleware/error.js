// err->ErrorHandler
// import ErrorHandler from "../utils/ErrorHandler";
export default (err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "internal server error";
    if(err.name==='ValidationError'){
        err.statusCode=400;  
        err.message = Object.values(err.errors).map(items=> items.message).join(',')
    }
    
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })

}