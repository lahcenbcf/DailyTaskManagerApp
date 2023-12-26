import React, { useEffect, useState ,useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { INIT_STATE } from '../constants/task'
import {IoTimeOutline} from "react-icons/io5"
import Spinner from './Spinner'
import { editTask } from '../actions/task'
function UpdateTask() {
    const navigate=useNavigate()
    const {state}=useLocation()
    const dispatch=useDispatch()
    const {loading,error,success}=useSelector(state=>state.taskReducer)
    const formRef=useRef()

    const [formData,setFormData]=useState({
        task:state.task,
        createdAt:state.createdAt,
        endsAt:state.endsAt,
        desc:state.desc,
        categorie:state.categorie,
        progressValue:state.progressValue
    })

    const handleChange=(e)=>{
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const updateTask=(e)=>{
        e.preventDefault()
        //check data
    if(!formData.task || !formData.categorie || !formData.desc || !formData.createdAt || !formData.endsAt){
        if(!formRef.current.classList.contains("myForm")) formRef.current.classList.add("myForm")
        return;
      };
      dispatch(editTask(state._id,formData))
    }

    useEffect(()=>{
        return ()=>dispatch({
            type:INIT_STATE
        })
    },[])

    useEffect(()=>{
        if(success) navigate("/dashboard")
    },[success])

  return( 
  <div className='px-6 flex flex-col gap-6 items-center h-full'>
  {
    /* loading */
    loading && <Spinner />
  }
    <h2 className='font-bold mt-4'>Edit your task</h2>
    <form ref={formRef} onSubmit={updateTask} className='max-w-md w-full p-8 shadow-lg bg-white rounded-md'>
        <div className='inputGroup my-2 mb-4 anima'>
              <label className='text-lg font-semibold text-darkBlue'>Title of Task</label>
              <input name='task' type='text' className='w-full bg-inherit outline-none border-b border-b-black focus:border-primary p-2' placeholder='task title' value={formData.task} onChange={handleChange} />
        </div>

        <div className='inputGroup flex justify-between'>
              <label className='text-lg font-semibold text-darkBlue'>choose categorie</label>
              <select name='categorie' defaultValue={"Design"} className='outline-none font-bold' value={formData.categorie} onChange={handleChange}>
                  <option className='font-bold' value={"Design"}>Design</option>
                  <option className='font-bold' value={"Planning"}>Planning</option>
                  <option className='font-bold' value={"mobile"}>mobile</option>
                  <option className='font-bold' value={"learning"}>learning</option>
              </select>
        </div>

        <div className='inputGroup mt-6'>
              <label className='text-lg font-semibold text-darkBlue'>description</label>
              <input name='desc' type='text' className='w-full bg-inherit outline-none border-b border-b-black focus:border-primary p-2' placeholder='task description' value={formData.desc} onChange={handleChange} />
        </div>

        <div className='inputGroup mt-6'>
            <div className='flex gap-2 items-center'>
            <IoTimeOutline />
              <label className='text-lg font-semibold text-darkBlue'>start from</label>
            </div>
              <input name='createdAt' type='date' className='w-full bg-inherit outline-none border-b border-b-black focus:border-primary p-2' value={formData.createdAt} onChange={handleChange}  />
        </div>

        <div className='inputGroup mt-6'>
            <div className='flex gap-2 items-center'>
            <IoTimeOutline />
              <label className='text-lg font-semibold text-darkBlue'>ends at</label>
            </div>
              <input name='endsAt' type='date' className='w-full bg-inherit outline-none border-b border-b-black focus:border-primary p-2' value={formData.endsAt} onChange={handleChange} />
        </div>
        <button type='submit' className='bg-primary w-full py-3 rounded-md text-white mt-10'>edit</button>
      
        {/* error handler */}
        {
          error && <p className='text-red-500 my-4'>{error}</p>
        }
        

    </form>
</div>
)
}

export default UpdateTask
