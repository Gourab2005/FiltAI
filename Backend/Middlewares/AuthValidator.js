const jwt = require('jsonwebtoken');
const AuthValidator = async(req,res,next)=>{
    const authheadertoken = req.headers['authorization'];
    if(!authheadertoken){
        return res.status(400).json({
            message:"JWT expired",
            sucess:false
        })
    }
    try{
        const decoded = jwt.verify(authheadertoken,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(400).json({
            message:"server error",
            error
        })
    }
}


module.exports={
    AuthValidator
}