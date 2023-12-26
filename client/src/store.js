import {createStore,combineReducers,applyMiddleware} from "redux"
import {thunk} from "redux-thunk"
import {authReducer} from "./reducers/auth"
import {composeWithDevTools} from "@redux-devtools/extension"
import { taskReducer } from "./reducers/task"

const middleware=[thunk]
const reducer=combineReducers({
    authReducer:authReducer,
    taskReducer
})
const initialState={}
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store