import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { serachTask } from "../actions/task";
function SearchBar() {
  const [keyword,setKeyword]=useState("")
  const [firstRender,setFirstRender]=useState(true)
  const {user}=useSelector(state => state.authReducer)
  const handleChange=(e)=>{
    setKeyword(e.target.value)
  }

  const dispatch = useDispatch()
  useEffect(()=>{
    if(!firstRender){
      const waitTime=2000;
      const bounceTime=setTimeout(()=>{
          dispatch(serachTask(keyword,user._id))
      },waitTime)

      return ()=>clearTimeout(bounceTime)
    }
  },[keyword])

  return (
    <div className="flex bg-inherit justify-center items-center rounded-md border-2 border-primary">
          <input type="search" value={keyword} onChange={handleChange} placeholder="search" className="py-3 px-5 bg-inherit outline-none" />
          <IoIosSearch size={20} className="h-full mx-2" />
    </div>
    
  )
}

export default SearchBar
