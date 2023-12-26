const express=require("express")
const {addTask,deleteTask,getTasks,editTask,editProgressValueTask, searchTask} = require("../controllers/taskController")
const taskRouter=express.Router()

taskRouter.get("/:userId",getTasks)
taskRouter.post("/addTask",addTask)
taskRouter.put("/editTask",editTask)
taskRouter.post("/deleteTask",deleteTask)
taskRouter.patch("/updateProgressValue",editProgressValueTask)
taskRouter.post("/search",searchTask)
module.exports={
    taskRouter
}