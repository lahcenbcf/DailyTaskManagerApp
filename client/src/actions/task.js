import {ADD_TASK,GET_TASKS,UPDATE_TASK,DELETE_TASK,TASK_FAILED_ACTION,TASK_PENDING,CHANGE_PROGRESS_VALUE,FOUND_TASKS} from "../constants/task"
import { baseUrl } from "./auth"

export const addTask=(task)=>async(dispatch)=>{
    try {
        dispatch({
            type:TASK_PENDING
        })
        const res=await baseUrl.post("/task/addTask",JSON.stringify(task),{
            headers:{
                "Content-Type":"application/json"
            }
        })
        
        if(res.data?.message){
            dispatch({
                message:res.data.message
            })
        }else{
            dispatch({
                type:ADD_TASK,
                payload:task
            })
        }

    } catch (error) {
        dispatch(
            {
                type:TASK_FAILED_ACTION,
                payload:error.message
            }
        )
    }
}


export const editTask=(taskId,newTask)=>async(dispatch)=>{
    try {
        dispatch({
            type:TASK_PENDING
        })
        const res=await baseUrl.put("/task/editTask",JSON.stringify({
            taskId,newTask
        }),{
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(res.data?.message){
            dispatch({
                message:res.data.message
            })
        }else{
            dispatch({
                type:UPDATE_TASK,
                payload:true
            })
        }

    } catch (error) {
        dispatch(
            {
                type:TASK_FAILED_ACTION,
                payload:error.message
            }
        )
    }
}


export const deleteTask=(taskId)=>async(dispatch)=>{
    try {
        dispatch({
            type:TASK_PENDING
        })
        const res=await baseUrl.post("/task/deleteTask",JSON.stringify({
            taskId
        }),{
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(res.data?.message){
            dispatch({
                message:res.data.message
            })
        }else{
            dispatch({
                type:DELETE_TASK,
                payload:taskId
            })
        }

    } catch (error) {
        dispatch(
            {
                type:TASK_FAILED_ACTION,
                payload:error.message
            }
        )
    }
}


export const getTasks=(userId)=>async(dispatch)=>{
    try {
        dispatch({
            type:TASK_PENDING
        })
        const res=await baseUrl.get(`/task/${userId}`)
        
        if(res.data?.message){
            dispatch({
                type:TASK_FAILED_ACTION,
                payload:res.data.message
            })
        }else{
            dispatch({
                type:GET_TASKS,
                payload:res.data
            })
        }

    } catch (error) {
        dispatch(
            {
                type:TASK_FAILED_ACTION,
                payload:error.message
            }
        )
    }
}

export const changeProgressValue=(newPv,taskId)=>async(dispatch)=>{
    try {
        const res = await baseUrl.patch("/task/updateProgressValue",JSON.stringify({newPv,taskId}),{
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(res.data?.message){
            dispatch({
                type:TASK_FAILED_ACTION,
                payload:"something went wrong"
            })
        }else{
       dispatch({
        type:CHANGE_PROGRESS_VALUE,
        payload:{
            newPv,
            taskId
        }
       }) }
    } catch (error) {
        dispatch({
            type:TASK_FAILED_ACTION,
            payload:error.message
        })
    }
}


export const searchTask=(keyword,userId)=>async(dispatch)=>{
    try {
        dispatch({
            type:TASK_PENDING
        })
        const res=await baseUrl.post("/task/search",JSON.stringify({
            keyword,
            userId
        }),{
            headers:{
                "Content-Type":"application/json"
            }
        })
        
        if(res.data?.message){
            dispatch({
                type:TASK_FAILED_ACTION,
                payload:res.data?.message
            })
        }else
        {
            dispatch({
                type:FOUND_TASKS,
                payload:res.data
            })
        }
    } catch (error) {
        dispatch({
            type:TASK_FAILED_ACTION,
            payload:error.action
        })
    }
}