const express=require("express")
const { register, login , logout, updateUserInfo, uploadPhoto, getUserPic} = require("../controllers/userController")
const userRouter=express.Router()


userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.get("/logout",logout);
userRouter.patch("/updateUserInfo",updateUserInfo)
userRouter.patch("/uploadUserPhoto",uploadPhoto)
userRouter.get("/getUserPic/:userId",getUserPic)


module.exports={
    userRouter
}