import { GET_CONTACTS } from "../actions/type";
const initState = {};

const contactReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(contact => {
          return contact.id !== action.payload.id;
        })
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, action.payload.contact]
      };
    case "UPDATE_CONTACT":
      const { contact } = action.payload;
      return {
        ...state,
        contacts: state.contacts.map(item => {
          return item.id === contact.id ? contact : item;
        })
      };
    default:
      return state;
  }
};

export default contactReducer;
