import React, { useEffect, useRef, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { IoEyeOutline,IoEyeOffOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../actions/auth';
import Spinner from './Spinner';
import { INIT_STATE } from '../constants/auth';
function Login() {
  const [visible,setVisible]=useState(false)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {loading,error,success}=useSelector(store => store.authReducer)
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const passwordRef=useRef()
  //hanle change function
  const handleChange=(e)=>{
      e.preventDefault()
      switch (e.target.name) {
        case "email":
          setFormData({
            ...formData,
            email:e.target.value
          })
          break;
        case "password":
          if(e.target.value.trim().length<10){
            passwordRef.current.classList.remove("border-primary")
            passwordRef.current.classList.add("border-red-500")
          }else{
            passwordRef.current.classList.add("border-primary");
            passwordRef.current.classList.remove("border-red-500");
           
          }
          setFormData({
            ...formData,
            password:e.target.value
            })
          break;
      }
  }
  //const submit
  const submitForm=(e)=>{
    e.preventDefault()
    dispatch(loginUser(formData))
  }
  const handleVisible=()=>setVisible(!visible)
  
  
  /*useEffect(()=>{
      if(success) navigate("/dashboard")
  },[success])
  */

  useEffect(()=>{
    dispatch({
      type:INIT_STATE
    })
  },[dispatch])
  return (
    <div className='px-4 flex items-center justify-center bg-bg-color h-screen'>

            {
              loading && <Spinner />
            }

          <form onSubmit={submitForm} className='max-w-md w-full rounded-md p-2 py-4 shadow-lg flex flex-col items-center relative bg-white'>
              {/* close Button */}
              <IoMdClose className='absolute top-3 right-3' />
              <h2 className='text-black font-bold my-4'>Welcome back!</h2>
              <p className='w-3/4 mx-auto text-slate-500 mb-5 font-bold text-xl text-center'>
                  log in to your account
              </p>
              <input name='email' onChange={handleChange} type='email' className='signIn' placeholder='e-mail' value={formData.email} />
              <div className='relative w-full mx-auto flex justify-center'>
                  <input type={visible ? "text" : "password"} ref={passwordRef} name="password" onChange={handleChange} value={formData.password} className='signIn' placeholder='password' />
                  {
                    !visible ? <IoEyeOffOutline className='absolute right-[15%] top-[50%] -translate-y-[50%]' onClick={handleVisible} /> : <IoEyeOutline className='absolute right-[15%] top-[50%] -translate-y-[50%]' onClick={handleVisible} />
                  }
              </div>
                  {/* handle errors */}
                  {error && <p className='text-red-500 w-full lg:w-11/12'>{error}</p>}
                  <div className='w-full lg:w-11/12 flex justify-between'>
                        {/* forgot pass */}
                        <Link className="text-primary font-bold underline self-start" to="/forgotPassword">forgot password</Link>
                        {/* create new account */}
                        <p className='text-primary font-bold'>dont have an account<Link className="underline" to="/register"> create</Link></p>
                  </div>
              

              {/* sign In */}
              <button type='submit' className='w-full lg:w-11/12 py-2 bg-primary text-white font-bold my-4'>Log in</button>
        </form>
      
    </div>
  )
}

export default Login
