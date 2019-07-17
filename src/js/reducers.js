import { combineReducers } from 'redux'
import todoReducer from './todoReducer'

const root = combineReducers({
    todo: todoReducer
})

export default root