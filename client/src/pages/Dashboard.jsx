import { useSelector } from "react-redux"
import SearchBar from "../components/SearchBar"
import SideBar from "../components/SideBar"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
function Dashboard() {
    const {user}=useSelector((state) => state.authReducer)
    const navigate=useNavigate()
    useEffect(()=>{
        if(!user.token) navigate("/login")
    },[user])

  return (
    <div className="bg-dark min-h-screen lg:grid lg:grid-cols-fluid">
            {/* sideBar */}
            <SideBar />

           
            {/* <div className="bg-coldBlue rounded-tl-3xl">
                 
                    <div className="flex justify-between px-8 items-center py-5">
                            <h2 className="font-bold text-black">Tasks</h2>
                            <SearchBar />
                            
                    </div>

                   
                    <div className=""></div>
            </div> */}
 {/* right side */}
     <div className="bg-coldBlue rounded-tl-3xl text-black p-6 min-h-screen">
     <Outlet />
     </div>



            
    </div>
  )
}

export default Dashboard
