const jwt=require('jsonwebtoken')
const {User}=require("../models/user")
const protect=async(req,res,next)=>{
    let token;
    try {
        if(req.headers.Authorization && req.headers.Authorization.startsWith("Bearer")){
            token = req.headers.Authorization.split("Bearer")[1];
            //verify
            const decoded=jwt.verify(token,process.env.JWT_SECERT)
            req.user =await User.findById(decoded.id).select('-password')
            next()
        }

        if(!token){
            res.status(401).json({
                message:"not authorized to do this action"
            })
        }
    } catch (error) {
        res.status(401).json({
            message:"not authorized"
        })
    }
}


module.exports={
    protect
}