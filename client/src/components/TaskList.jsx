import React, { useEffect, useState } from 'react'
import SearchBar from "../components/SearchBar"
import { CiCircleInfo } from "react-icons/ci";
import { HiDotsHorizontal } from "react-icons/hi";
import TaskItem from './TaskItem';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../actions/task';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';



function TaskList() {
  const dispatch=useDispatch()
  const {loading,error,tasks}=useSelector(state => state.taskReducer)
  const [organizedTasks,setOrganizedTasks]=useState([])
  const {user}=useSelector(state => state.authReducer)
  


  useEffect(()=>{
    if(user._id) dispatch(getTasks(user?._id))
},[])


  useEffect(()=>{
      if(tasks.length){
        const organizedTasks = tasks.reduce((acc, task) => {
          if (!acc[task.status]) {
            acc[task.status] = [];
          }
          acc[task.status].push(task);
          return acc;
        }, {});
        setOrganizedTasks(organizedTasks)
      }
  },[tasks])

  return (
    <div className='px-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
            <h2 className='font-bold'>Tasks</h2>
            {/* search bar */}
            <SearchBar />
      </div>


      {
        organizedTasks.length ?
        
        
        <div className='relative grid grid-cols-2  lg:grid-cols-4 gap-8 my-4 min-h-screen'>
                {/* not started yet */}
                <div className='flex flex-col gap-4'>
                  {/* not started header */}
                  <div className="flex justify-between items-center py-2 border-b border-pinkColor">
                        <div className='flex items-center gap-4'>
                              <p className='font-bold text-darkBlue'>Not Started</p>
                              <CiCircleInfo />
                        </div>
                        {/* HiHorizontal Dots */}
                        <HiDotsHorizontal />
                  </div>
  
                  {/* not started tasks listing */}
                    {
                      (organizedTasks["not started"] && organizedTasks["not started"].length) && organizedTasks["not started"].map((task,index)=>(
                        <TaskItem key={index} {...task} />
                      ))
                    }
  
                </div>
  
                {/*started */}
  
                <div className='flex flex-col gap-4'>
                  {/* started header */}
                  <div className="flex justify-between items-center py-2 border-b border-orangeColor">
                        <div className='flex items-center gap-4'>
                              <p className='font-bold text-darkBlue'>Started</p>
                              <CiCircleInfo />
                        </div>
                        {/* HiHorizontal Dots */}
                        <HiDotsHorizontal />
                  </div>
  
                  {/* listing our started tasks */}
                  {(organizedTasks["started"] && organizedTasks["started"].length) && 
                    organizedTasks["started"].map((task,index)=>(
                      <TaskItem key={index} {...task} />
                    ))
                  }
                </div>
  
                
                {/* in progress */}
  
                <div className='flex flex-col gap-4'>
                  {/* in progress header */}
                  <div className="flex justify-between items-center py-2 border-b border-primary">
                        <div className='flex items-center gap-4'>
                              <p className='font-bold text-darkBlue'>in progress</p>
                              <CiCircleInfo />
                        </div>
                        {/* HiHorizontal Dots */}
                        <HiDotsHorizontal />
                  </div>
  
                   {/* listing our in progress tasks */}
                   {(organizedTasks["in progress"] && organizedTasks["in progress"].length) && 
                   organizedTasks["in progress"].map((task,index)=>(
                     <TaskItem key={index} {...task} />
                   ))
                 }
                </div>
  
                {/* completed */}
  
                <div className='flex flex-col gap-4'>
                  {/* completed header */}
                  <div className="flex justify-between items-center py-2 border-b border-purpleColor">
                        <div className='flex items-center gap-4'>
                              <p className='font-bold text-darkBlue'>Completed</p>
                              <CiCircleInfo />
                        </div>
                        {/* HiHorizontal Dots */}
                        <HiDotsHorizontal />
                  </div>
                  {/* listing our completed tasks */}
                  {(organizedTasks["completed"] && organizedTasks["completed"].length) && 
                  organizedTasks["completed"].map((task,index)=>(
                    <TaskItem key={index} {...task} />
                  ))
                }
                </div>
  
                    {error && <p className='text-red-600'>{error}</p>}
                { loading ? <Spinner /> :(organizedTasks.length &&  organizedTasks?.map((task,index)=>(
                  <TaskItem key={index} {...task} />
                )) )}
  
  
                
        </div> : <p>no tasks <Link className=' text-primary underline' to="/dashboard/addTask">Add your first task</Link></p>
      }
      
    </div>
  )
}

export default TaskList
