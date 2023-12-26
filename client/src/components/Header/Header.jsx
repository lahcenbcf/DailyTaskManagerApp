import { SiTask } from "react-icons/si";
import {Link} from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/auth";



function Header(){
    const [visible,setVisible]=useState(false)
    const handleVisible=(e)=>{
        setVisible(!visible)
    }
    const dispatch=useDispatch()
    const closeSession=(e)=>{
        e.preventDefault()
        dispatch(logoutUser())
    }

    const {user} = useSelector(state => state.authReducer)

  return (
    <nav className="nav px-6 py-6 flex items-center justify-between bg-white shadow-lg">
            {
                /* our logo */
            }
            <div className="flex items-center gap-3">
                    <SiTask size={30} className="animate-bounce text-primary" />
                    <h2 className="font-bold text-primary">Simpl.</h2>
            </div>

            {/* signIn && signOut */}
            {
                user?._id ?  <div className="hidden md:flex gap-6">
                <Link onClick={closeSession} className="hidden md:block font-meduim text-slate-400 hover:text-primary text-xl">logout</Link>
                <Link to={"/dashboard/profile"} className="hidden md:block font-meduim text-slate-400 hover:text-primary text-xl">profile</Link>
                </div> :  <div className="hidden md:flex gap-6">
                <Link to={"/register"} className="font-meduim text-slate-400 hover:text-primary text-xl">register</Link>
                <Link to={"/login"} className="font-meduim text-slate-400 hover:text-primary text-xl">login</Link>
        </div>
            }
            


            {/* nav is mobile layout */}
            {/* menu btn */}
            {
                visible ? <IoMdClose size={20} className="absolute right-4 top-8 md:hidden" onClick={handleVisible} /> : 
            
            <LuMenu size={20} className="absolute right-4 top-8 md:hidden" onClick={handleVisible} />
            }
            {/* our listItems */}
            {
                visible && ( !user?._id ? 
                <ul className="absolute right-14 top-3 shadow-lg list-none flex flex-col items-center px-6 py-4 rounded-md bg-slate-500 md:hidden">
                    <Link to={"/register"} className="font-meduim text-white hover:text-primary text-xl" onClick={handleVisible}>register</Link>
                    <Link to={"/login"} className="font-meduim text-white hover:text-primary text-xl" onClick={handleVisible}>login</Link>
                </ul>
                 :
                 <ul className="absolute right-14 top-3 shadow-lg list-none flex flex-col items-center px-6 py-4 rounded-md bg-slate-500 md:hidden">
                 <Link className="font-meduim text-white hover:text-primary text-xl" to={"/dashboard/profile"} >profile</Link>
                 <Link className="font-meduim text-white hover:text-primary text-xl" onClick={closeSession} >logout</Link>   
                 </ul>
                )
                }
            
    </nav>
  )
}

export default Header
