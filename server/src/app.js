const express=require("express")
const {connect}=require("../config")
const {userRouter}=require("./routes/user")
const {taskRouter} =require("./routes/task")
const {uploadRouter}=require("./routes/uploadRoute")
const cors=require("cors")
const path=require("path")
const app=express()
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

app.use("/uploads",express.static(path.join(path.resolve(),"/uploads")))
app.use(cors())
app.use("/user",userRouter)
app.use("/task",taskRouter)
app.use("/upload",uploadRouter)




























const PORT=5000;
connect().then(()=>{
    app.listen(PORT,()=>console.log("app is running"))
}).catch((e)=>console.log("error"));
