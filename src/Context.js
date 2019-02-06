import React, { Component } from "react";
import Axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
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

export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: action =>
      this.setState(state => {
        return reducer(state, action);
      })
  };

  async componentDidMount() {
    const res = await Axios("https://jsonplaceholder.typicode.com/users");
    this.setState({
      contacts: res.data
    });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
