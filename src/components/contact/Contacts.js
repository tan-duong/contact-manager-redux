import React, { Component } from "react";
import Contact from "./Contact";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getContacts} from '../../redux/actions/contact'

class Contacts extends Component {
  static PropTypes = {
    contacts: PropTypes.array.isRequired,
    getContacts: PropTypes.func.isRequired
  }

  componentDidMount(){
    const { getContacts} = this.props
    getContacts()
  }

  render() {
    const {contacts} = this.props
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
  }
}

const mapState = (state) => {
  return {
    contacts: state.contact.contacts,
  }
}

const actionCreator = {
  getContacts
}

export default connect(mapState, actionCreator)(Contacts)