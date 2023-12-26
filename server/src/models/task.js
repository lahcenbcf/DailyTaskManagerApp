const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    desc:{
        type:String
    },
    status:{
        type:String,
        enum:["not started","started","in progress","completed"],
        default:"backlog"
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    progressValue:{
        type:Number,
        default:0
    },
    createdAt:{
        type:mongoose.Schema.Types.Date,
        default:new Date()
    },
    endsAt:{
        type:mongoose.Schema.Types.Date,
        required:true
    },
    categorie:{
        type:String,
        enum:["Design","Planning","mobile","learning"],
        required:true
    }
})

taskSchema.statics.matchStatusWithPogressValue =(pv)=>{
    switch (pv) {
        case 0:
            return "not started"
        case 1:
            return "started"
        case 10:
            return "completed"
        default:
            return "in progress";
    }
}

const Task= mongoose.model("Task",taskSchema)
module.exports={
    Task
}