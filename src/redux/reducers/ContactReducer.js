import {GET_CONTACTS} from '../actions/type'
const initState = {}

const contactReducer = (state = initState, action) => {
    switch(action.type){
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
            }
        default:
            return state
    }
}

export default contactReducer