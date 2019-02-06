import {combineReducers} from 'redux'
import contactReducer from './ContactReducer'

const rootReducer = combineReducers({
    contact: contactReducer
})

export default rootReducer