import React, { Component } from "react";
//mport uuid from "uuid";
import TextInputGroup from "../layout/TextInputGroup";
import Axios from "axios";
import {connect} from 'react-redux'
import {getContact, updContact} from '../../redux/actions/contact'

class EditContact extends Component {
  state = {
    name: "",
    phone: "",
    email: "",

    nameErr: "",
    emailErr: "",
    phoneErr: ""
  };

  componentWillReceiveProps() {

    const { name, phone, email } = this.props.contact;
    this.setState({
      name: name,
      phone: phone,
      email: email
    });
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const {getContact} = this.props
    getContact(id)
    
  }

  _onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  _onSubmit = async (dispatch, e) => {
    e.preventDefault();

    let { name, phone, email } = this.state;
    const { id } = this.props.match.params;

    //Check errors
    if (name === "" || email === "" || phone === "") {
      this.setState({
        nameErr: name === "" ? "name is required" : "",
        emailErr: email === "" ? "email is required" : "",
        phoneErr: phone === "" ? "phone is required" : ""
      });
      return;
    }

    const contact = {
      id: id,
      name,
      phone,
      email
    };

    

    this.setState({
      name: "",
      phone: "",
      email: "",
      nameErr: "",
      emailErr: "",
      phoneErr: ""
    });

    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, nameErr, emailErr, phoneErr, dispatch } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Update Contact</div>
        <div className="card-body">
          <form onSubmit={this._onSubmit.bind(this, dispatch)}>
            <TextInputGroup
              name="name"
              placeholder="Enter name ..."
              value={name}
              onChange={this._onChange}
              error={nameErr}
            />
            <TextInputGroup
              name="email"
              placeholder="Enter email ..."
              value={email}
              onChange={this._onChange}
              error={emailErr}
            />
            <TextInputGroup
              name="phone"
              placeholder="Enter phone ..."
              value={phone}
              onChange={this._onChange}
              error={phoneErr}
            />

            <input
              type="submit"
              value="Update Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    contact: state.contact.contact,
  }
}

const actions = {
  getContact,
  updContact,
}

export default connect()(EditContact)
