import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useDebounce=(keyword,callback,dispatch)=>{

    const { user } = useSelector((state) => state.authReducer);
    useEffect(() => {
        const waitTime = 2000;
        const bounceTime = setTimeout(() => {
          dispatch(callback(keyword, user._id));
        }, waitTime);
    
        return () => clearTimeout(bounceTime);
      }, [keyword]);
}