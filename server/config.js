const mongoose=require("mongoose")
require("dotenv").config()
//connect to mongoDb

const connect=async ()=>{
  try {
    
    console.log(process.env.connectionString);
    await mongoose.connect(process.env.connectionString);
    console.log("connected")
  } catch (error) {
    console.log("error")
  }
    
}


module.exports= {connect }