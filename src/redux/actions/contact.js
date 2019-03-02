import {
  GET_CONTACTS,
  DELETE_CONTACT,
  ADD_CONTACT,
  UPDATE_CONTACT,
  GET_CONTACT
} from "./type";
import axios from "axios";

export const getContacts = async  () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");


    return {
      type: GET_CONTACTS,
      payload: res.data,
    };
  } catch (error) {
    console.error(error);
  }
};


export const getContact = async id => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    return {
      type: GET_CONTACT,
      payload: res.data
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteContact = async id => {
  try {
    const res = await axios({
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
  try {
    const res = await axios({
      url: "https://jsonplaceholder.typicode.com/users",
      method: "post",
      data: contact
    });

    console.log(res.data);

    return {
      type: ADD_CONTACT,
      payload: { contact: res.data }
    };
  } catch (error) {
    console.error(error);
  }
};

export const updContact = async (id, contact) => {
  try {
    const res = await axios({
      url: `https://jsonplaceholder.typicode.com/users/${id}`,
      method: "put",
      data: contact
    });

    console.log(res.data);

    return {
      type: UPDATE_CONTACT,
      payload: {
        contact
      }
    };
  } catch (error) {
    console.error(error);
  }
};
