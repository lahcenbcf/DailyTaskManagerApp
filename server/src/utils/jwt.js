const jwt=require("jsonwebtoken")

const createWebToken=(userId)=>{
    console.log(process.env.JWT_SECRET)
    return jwt.sign({
        _id:userId
    },process.env.JWT_SECRET,{
        expiresIn:"24h"
    })
}


module.exports={
    createWebToken
}