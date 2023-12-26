import {TASK_PENDING,ADD_TASK, UPDATE_TASK,DELETE_TASK,GET_TASKS,TASK_FAILED_ACTION,INIT_STATE,CHANGE_PROGRESS_VALUE,FOUND_TASKS} from "../constants/task"

const initialTasks=localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []
const initialState={
    loading:false,
    success:false,
    error:"",
    tasks:initialTasks
}


export const taskReducer=(state=initialState,action)=>{
    switch (action.type) {
        case INIT_STATE:
            return {
                ...state,
                success:false
            }
        case TASK_PENDING:
            return {
                ...state,
                loading:true
            }
        case ADD_TASK:
            return {
                ...state,
                success:true,
                loading:false,
                tasks:[...state.tasks,action.payload]
            }
        case UPDATE_TASK:
            const {taskId,newTask}=action.payload
            const newTasks=state.tasks.map(t=>{
                if(t._id === taskId){
                    return newTask
                }
                return t;
            })
            return {
                ...state,
                success:true,
                tasks:newTasks,
                loading:false
            }
        
        case DELETE_TASK:
            const taskid=action.payload;
            state.tasks=state.tasks.filter(t => t._id != taskid)
            return {
                ...state,
                success:true,
                loading:false
            }
        case GET_TASKS:
            return {
                ...state,
                loading:false,
                tasks:action.payload
            }
        case TASK_FAILED_ACTION:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case CHANGE_PROGRESS_VALUE:
            const pv=action.payload.newPv;
            const task_id=action.payload.taskId
            switch (pv) {
                case 0:
                    return {
                        ...state,
                        tasks:state.tasks.map(task => {
                            if(task._id == task_id){
                                task.status="not started"
                                task.progressValue=pv
                            }
                            return task
                        })
                    }
                case 1:
                    return {
                        ...state,
                        tasks:state.tasks.map(task => {
                            if(task._id == task_id){
                                task.status="started"
                                task.progressValue=pv
                            }
                            return task
                        })
                    }
                case 10:
                    return {
                        ...state,
                        tasks:state.tasks.map(task => {
                            if(task._id == task_id){
                                task.status="completed"
                                task.progressValue=pv
                            }
                            return task
                        })
                    }
                default:
                    return {
                        ...state,
                        tasks:state.tasks.map(task => {
                            if(task._id == task_id){
                                task.status="in progress"
                                task.progressValue=pv
                            }
                            return task
                        })
                    }
            }
        case FOUND_TASKS:
            return {
                ...state,
                loading:false,
                tasks:action.payload
            }
    
        default:
            return state
    }
}