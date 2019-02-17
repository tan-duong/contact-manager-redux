import {
  GET_CONTACTS,
  DELETE_CONTACT,
  ADD_CONTACT,
  UPDATE_CONTACT
} from "./type";
import axios from "axios";

export const getContacts = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");

  return {
    type: GET_CONTACTS,
    payload: res.data
  };
};

export const deleteContact = async id => {
  try {
    const res = await Axios({
      url: `https://jsonplaceholder.typicode.com/users/${id}`,
      method: "delete"
    });

    if (res.status === 200)
      return {
        type: DELETE_CONTACT,
        payload: {
          id: id
        }
      };
  } catch (error) {
    return {
      type: DELETE_CONTACT,
      payload: {
        id: id
      }
    };
  }
};

export const addContact = async contact => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");

  return {
    type: ADD_CONTACT,
    payload: { contact }
  };
};

export const updContact = async contact => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");

  return {
    type: UPDATE_CONTACT,
    payload: {
      contact
    }
  };
};
