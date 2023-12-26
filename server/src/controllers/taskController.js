const { ObjectId } = require("mongoose/lib/types")
const {Task}=require("../models/task")
const addTask=async(req,res)=>{
    try {
        const task=req.body
        const newTask=await Task.create(task)
        if(newTask){
            return res.status(201).send(true)
        } else{
            return res.status(400).json({
                message:"something went wrong"
            })
        }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

const editTask=async(req,res)=>{
    try {
        const {newTask,taskId}=req.body
        const result = await Task.findOneAndUpdate({
            _id:taskId
        },{$set:{...newTask}})

        if(result){
          res.send(true)
        }else{
           res.status(400).json({
                    message:"something went wrong"
            })
        }
    } catch (error) {
        return res.json({
            type:error.message
        })
    }
}

const deleteTask=async(req,res)=>{
    try {
        const {taskId}=req.body
        const result=await Task.findOneAndDelete({
            _id:taskId
        })
        if(result){
            res.send(true)
        }else{
            res.status(400).json({
                message:"something went wrong"
            })
        }
    } catch (error) {
        return res.json({
            message:error.message
        })
    }
}

const getTasks=async(req,res)=>{
    try {
        const {userId}=req.params
        const tasks=await Task.find({
            createdBy:new ObjectId(userId)
        })
        res.status(200).json(tasks)
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}



const editProgressValueTask=async(req,res)=>{
    try {
        const {taskId,newPv}=req.body
        const result=await Task.findOneAndUpdate({
            _id:taskId
        },{$set:{progressValue:newPv,status:Task.matchStatusWithPogressValue(newPv)}})
        if(result){
            res.send(true)
        }else{
           return res.status(400).json({
                message:"something went wrong"
            })
        }
    } catch (error) {
        return res.json({
            message:error.message
        })
    }
}


const searchTask=async(req,res)=>{
    try {
        const {keyword,userId}=req.body;
        console.log(req.body)
        const search = keyword
        ? {
            task: {
              $regex: keyword
            },
          }
        : {}
        const count=await Task.countDocuments({
            ...search
        })
        const response=await Task.find({
...search,
createdBy:new ObjectId(userId)
        }).limit(4)

        if(response){
            return res.json(response)
        }else{
            return res.json({
                message:"something went wrong"
            })
        }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

module.exports={
    addTask,
    editTask,
    deleteTask,
    getTasks,
    editProgressValueTask,
    searchTask
}