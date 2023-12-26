import {AUTH_FAILED,INIT_STATE,AUTH_LOADING,GET_USER_PIC,CLEAR_USER_CACHE,AUTH_SUCCESS,REGISTER_SUCCESS, UPDATE_USER_INFO,UPDATE_USER_PICTURE} from "../constants/auth"


const user=localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
/*const userPicture=localStorage.getItem("userImage") ? JSON.parse(localStorage.getItem("userImage")) : null*/
const initialState={
    user:user,
    userPic:null,
    error:"",
    success:false,
    loading:false
}

export const authReducer=(state=initialState,action)=>{
    switch (action.type) {
        case AUTH_LOADING:
            return {
                ...state,
                loading:true
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                success:true,
                loading:false,
                user:action.payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                success:true,
                loading:false
            }
        case AUTH_FAILED:
            return {
                ...state,
                success:false,
                error:action.payload,
                loading:false
            }
        case UPDATE_USER_INFO:
            return {
                ...state,
                success:true,
                loading:false,
                user:{
                    ...user,
                    [action.payload.key]:action.payload.value
                }
            }
        case UPDATE_USER_PICTURE:
            return {
                ...state,
                loading:false,
                userPic:action.payload
            }
        case CLEAR_USER_CACHE:
            return {
                ...state,
                loading:false,
                user:{}
            }
        case GET_USER_PIC:
            return {
                ...state,
                loading:false,
                userPic:action.payload
            }
        default:
            return state
    }
}