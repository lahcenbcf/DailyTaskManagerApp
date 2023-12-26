const {User}=require("../models/user")
const bcrypt=require('bcryptjs')
const {createWebToken} =require("../utils/jwt")
const fs=require("fs")
const path = require("path")
//@desc registerUser
//@route /user/register
//@access public
const register=async(req,res)=>{
    try {
        const {email,password} = req.body
        const userExist=await User.findOne({
            email
        })
        if(userExist){
            return res.json({
                message:"user already exist"
            })
        }
        const user = await User.create({
            email,
            password
        })
        if(user) res.status(201).send(true)
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

//@desc login user
//@route /user/login
//@access public
const login=async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({
            email
        })
        if(user){
            //check password
            const isMatched=await bcrypt.compareSync(password,user.password)
            if(isMatched){
                //create token
                const token=createWebToken(user._id)
                res.status(200).json({
                    ...user._doc,
                    token
                })
            }else{
                res.json({
                    message:"password false"
                })
            }
        }else{
            res.json({
                message:"no account with this email"
            })
        }

    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

const logout=(req,res)=>{
    try {
        res.send(true)
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

const updateUserInfo=async(req,res)=>{
    try {
        const {key,value,userId}=req.body
        const response=await User.findOneAndUpdate({
        _id:userId
        },{
        $set:
         {[key]:value}
        })   
        console.log(response)
        return res.json(response)
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}


const uploadPhoto=async(req,res)=>{
    try {
        const { imagePath , userId } =req.body;
        const extName=imagePath.split(".")[1]
        const imageBuffer=fs.readFileSync(path.join(path.resolve()+imagePath));
        const user = await User.findByIdAndUpdate({
            _id:userId
        },{
            $set:{
                imageData:{
                    image:imageBuffer,
                    extName:extName
                }
            }
        })

        if(user){
            return res.json({
                image:(await User.findById({
                    _id:user._id
                })).imageData.image,
                extName:extName
            })
        }
        return res.json({
            message :"something went wrong"
        })
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

const getUserPic=async(req,res)=>{
    try {
        const {userId}=req.params;
        console.log(userId)
        const response=await User.findById({
            _id:userId
        })
        if(response){
            return res.status(200).json(response.imageData)
        }else{
            return res.json({
                message:"some thing went wrong"
            })
        }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}
module.exports={
    register,
    login,
    logout,
    updateUserInfo,
    uploadPhoto,
    getUserPic
}