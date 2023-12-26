const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
//connect to mongoDb

const connect=async ()=>{
  try {
    await mongoose.connect(process.env.connectionString);
    console.log("connected")
  } catch (error) {
    console.log("error")
  }
    
}


module.exports= {connect }