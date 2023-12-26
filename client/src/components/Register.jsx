import React, { useEffect, useRef, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { IoEyeOutline,IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import {registerUser} from "../actions/auth"
import Spinner from './Spinner';

function Register() {
  const [visible,setVisible]=useState(false)
  const passwordRef=useRef()
  const confirmPassRef=useRef()
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const navigate=useNavigate()

  const dispatch=useDispatch()
  const {loading,success,error}=useSelector(store => store.authReducer)
  const handleChange=(e)=>{
    e.preventDefault()
    switch (e.target.name){
      case "email":
        setFormData({
          ...formData,
          email:e.target.value
        })
        break;
      case "password":
        if(e.target.value.trim().length < 10){
          passwordRef.current.classList.remove("border-primary")
          passwordRef.current.classList.add("border-red-500")
        }else{
          passwordRef.current.classList.remove("border-red-500")
          passwordRef.current.classList.add("border-primary")
        }
        setFormData({
          ...formData,
          password:e.target.value
        })
        break;
      case "confirmpassword":
        if(e.target.value != formData.password){
          confirmPassRef.current.classList.add("border-red-500");
          confirmPassRef.current.classList.remove("border-primary")
        }else{
          confirmPassRef.current.classList.remove("border-red-500");
          confirmPassRef.current.classList.add("border-primary")
        }
    }
  }

  const submitForm=(e)=>{
    e.preventDefault()
    dispatch(registerUser(formData))
  }
  const handleVisible=()=>setVisible(!visible)

useEffect(()=>{
  if(success) navigate("/login")
},[success])

  return (
    <div className='px-4 flex items-center justify-center bg-bg-color h-screen'>
    {
      loading && <Spinner />
    }
    {
      success && <div className="absolute top-4 right-[50%] translate-x-[50%] w-fit text-white font-bold alert alert-success">
      <span>Message sent successfully.</span>
    </div>
    }

        <form onSubmit={submitForm} className='max-w-md w-full rounded-md p-4 shadow-lg flex flex-col items-center relative bg-white'>
              {/* close Button */}
              <IoMdClose className='absolute top-3 right-3' />
              <h2 className='text-black font-bold my-4'>Sign Up To <span className='font-extrabold text-primary'>Simplr.</span> !</h2>
              <p className='w-3/4 mx-auto text-slate-500 mb-5 font-bold text-xl text-center'>
                  create a free account
              </p>
              {/* email */}
              <input name="email" value={formData.email} onChange={handleChange} type='email' className='signIn' placeholder='e-mail' />
              {/* password */}
              <div className='relative w-full mx-auto flex justify-center'>
                  <input name="password" ref={passwordRef} type={visible ? "text" : "password"} className='signIn' placeholder='password' onChange={handleChange} value={formData.password} />
                  {
                    !visible ? <IoEyeOffOutline className='absolute right-[20%] top-[50%] -translate-y-[50%]' onClick={handleVisible} /> : <IoEyeOutline className='absolute right-[20%] top-[50%] -translate-y-[50%]' onClick={handleVisible} />
                  }
              </div>
              {/* confirm password */}
              <div className='relative w-full mx-auto flex justify-center'>
                  <input name='confirmpassword' ref={confirmPassRef} onChange={handleChange} type={visible ? "text" : "password"} className='signIn' placeholder='confirm password' />
                  {
                    !visible ? <IoEyeOffOutline className='absolute right-[15%] top-[50%] -translate-y-[50%]' onClick={handleVisible} /> : <IoEyeOutline className='absolute right-[15%] top-[50%] -translate-y-[50%]' onClick={handleVisible} />
                  }
              </div>

                  {/* handle error messages */}
                  {error && <p className='text-red-500'>{error}</p>}

              {/* forgot pass */}
              <p className="text-primary font-bold self-start md:ml-8">have an account ? <Link className='underline' to="/login">login</Link></p>

              {/* sign In */}
              <button type='submit' className='w-full lg:w-11/12 py-2 bg-primary text-white font-bold my-4'>create account</button>
        </form>
      
    </div>
  )
}

export default Register
