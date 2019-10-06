import { createStore, combineReducers } from "redux"
import tasksReducer from './reducers/tasksReducer'
import listReducer from "./reducers/listReducer"

let store = createStore(combineReducers({
    tasks: tasksReducer,
    list: listReducer
}))

export default store