import {AUTH_FAILED,AUTH_LOADING,AUTH_SUCCESS,GET_USER_PIC, REGISTER_SUCCESS,CLEAR_USER_CACHE, UPDATE_USER_INFO,UPDATE_USER_PICTURE} from '../constants/auth'
import axios from "axios"


export const baseUrl=axios.create({
    baseURL:"https://dailytaskmanagerserver.onrender.com"
})
export const loginUser=(data)=>async(dispatch)=>{
    try {
        dispatch({
            type:AUTH_LOADING
        })
        const res=await baseUrl.post("/user/login",JSON.stringify(data),{
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(!res?.data?.message){
            dispatch({
                type:AUTH_SUCCESS,
                payload:res.data
            })
            //save in localStorage
            localStorage.setItem("user",JSON.stringify({
                token:res.data.token,
                firstName:res.data.firstName,
                lastName:res.data.lastName,
                email:res.data.email,
                password:res.data.password,
                _id:res.data._id
            }))
            
            window.location.href="/dashboard"

        }else{
            dispatch({
                type:AUTH_FAILED,
                payload:res.data.message
            })
        }
    } catch (error) {
        dispatch({
            type:AUTH_FAILED,
            payload:error.message
        })
    }
}

//register
export const registerUser=(data)=>async(dispatch)=>{
    try {
        dispatch({
            type:AUTH_LOADING
        })
        const res=await baseUrl.post("/user/register",JSON.stringify(data),{
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(res?.data?.message){
            dispatch({
                type:AUTH_FAILED,
                payload:res.data.message
            })
        }else{
            dispatch({
                type:REGISTER_SUCCESS
            })
            //go to login page
        }
    } catch (error) {
        dispatch({
            type:AUTH_FAILED,
            payload:error.message
        })
    }
}

export const logoutUser=()=>async(dispatch)=>{
    try {
        dispatch({
            type:AUTH_LOADING
        })
        await baseUrl.get("/user/logout")
        //clear the localStorage
        localStorage.clear("user")
        localStorage.clear("userImage")
        //clear our userState
        dispatch({
            type:CLEAR_USER_CACHE
        })
    } catch (error) {
        dispatch({
            type:AUTH_FAILED,
            payload:error.message
        })
    }
}

export const updateUserInfo=(key,value,userId)=>async(dispatch,getState)=>{
        try {
                dispatch({
                    type:AUTH_LOADING
                })
                const res=await baseUrl.patch("/user/updateUserInfo",JSON.stringify({
                    key,value,userId
                }),{headers:{
                    "Content-Type":"application/json"
                }})
                if(res.data?.message){
                    dispatch({
                        type:AUTH_FAILED,
                        payload:res.data.message
                    })
                }else{
                    dispatch({
                        type:UPDATE_USER_INFO,
                        payload:{
                            key,value
                        }
                    })
                //save in localStorage
            localStorage.setItem("user",JSON.stringify({
                ...getState().authReducer.user,
                [key]:value,
                email:res.data.email,
                password:res.data.password,
                _id:res.data._id
            }))
                }

        } catch (error) {
            dispatch({
                type:AUTH_FAILED,
                payload:error.message
            })
        }
}

export const uploadUserPhoto=(userId,imagePath)=>async(dispatch)=>{
        try {
            dispatch({
                type:AUTH_LOADING
            })
            const res=await baseUrl.patch("/user/uploadUserPhoto",{
                imagePath,userId
            },{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            
            if(res.data?.message){
                dispatch({
                    type:AUTH_FAILED,
                    payload:res.data.message
                })
            }else{
                dispatch({
                    type:UPDATE_USER_PICTURE,
                    payload:res.data
                })
                //update localStorage
                localStorage.setItem("userImage",JSON.stringify(res.data.imageData))
            }
        } catch(error) {
            dispatch({
                type:AUTH_FAILED,
                payload:error.message
            })
        }
}   


export const getUserPic=(userId)=>async(dispatch)=>{
    try {
        dispatch({
            type:AUTH_LOADING
        })
        const res=await baseUrl.get(`/user/getUserPic/${userId}`)
        if(res.data?.message){
            dispatch({
                type:AUTH_FAILED,
                payload:res.data.message
            })
        }else{
            dispatch({
                type:GET_USER_PIC,
                payload:res.data
            })
        }

    } catch (error) {
        dispatch({
            type:AUTH_FAILED,
            payload:error.message
        })
    }
}