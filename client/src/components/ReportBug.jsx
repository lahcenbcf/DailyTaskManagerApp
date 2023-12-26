import { useState } from "react"
import { useContact } from "../customHooks/useContact"
import Spinner from "./Spinner"

export default function ReportBug() {
    const [formData,setFormData]=useState({
        title:"",
        desc:"",
        subject:"",
        email:""
    })
    const [sendMail]=useContact()
    const handleChange=(e)=>{
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const [loading,setLoading]=useState(false)

    const submitHandler=(e)=>{
        e.preventDefault()
            setLoading(true)
            try {
                sendMail(formData,setLoading,setFormData)
            } catch (error) {
                setLoading(false)
            }finally{
                setLoading(false)
            }
    }
  return (
    <div className="bg-white max-w-md w-full p-6 shadow-lg rounded-md flex flex-col gap-4">
    {loading && <Spinner />}
            <h3 className="text-dark font-bold mt-4">Report a bug or ask for feature</h3>
            <form onSubmit={submitHandler}>

            <div className="inputGroup flex gap-2 items-center my-4">
            <label className="font-bold text-slate-500">Your Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="px-3 py-2 rounded-sm outline-none bg-inherit border focus:border-primary" placeholder="email" />
            </div>
                    <div className="inputGroup flex items-center gap-2 my-4">
                            <span className="font-bold text-slate-500">I would like to</span>
                            <input name="subject" value={formData.subject} onChange={handleChange} type="text" className="px-3 py-2 rounded-sm outline-none bg-inherit border focus:border-primary" placeholder="subject" />
                    </div>
                    <div className="inputGroup flex gap-2 items-center my-4">
                    <label className="font-bold text-slate-500">Title</label>
                    <input name="title" value={formData.title} onChange={handleChange} className="px-3 py-2 rounded-sm outline-none bg-inherit border focus:border-primary" type="text" placeholder="title" />
                    </div>

                    <div className="inputGroup flex gap-2 my-4">
                    <label className="font-bold text-slate-500">Description</label>
                    <textarea name="desc" value={formData.desc} onChange={handleChange} cols={30} rows={10} className="px-3 py-2 rounded-sm outline-none bg-inherit border focus:border-primary" type="text" placeholder="description" />
                    </div>

                    {/* submitBtn */}

                    <button type="submit" className="text-white font-bold px-4 py-3 shadow-xl my-4 rounded-md bg-primary">submit</button>

            </form>
    </div>
  )
}
