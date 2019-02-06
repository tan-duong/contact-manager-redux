import React, { Component } from "react";
import Contact from "./Contact";
import { Consumer } from "../../Context";

export default class Contacts extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <React.Fragment>
              <h1 className="display-4 mb-2">
                <span className="text-danger">Contact List</span>{" "}
              </h1>

              {contacts.map(contact => {
                return <Contact key={contact.id} contact={contact} />;
              })}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}
