import {GET_CONTACTS} from './type'
import axios from 'axios'

export getContacts = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    
    return {
        type: GET_CONTACTS,
        payload: res.data,
    }
}