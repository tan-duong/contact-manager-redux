import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
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


  async componentDidMount() {
    const { id } = this.props.match.params;
    const {getContact} = this.props
    getContact(id)
    
  }

  _onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  _onSubmit = async (e) => {
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

    this.props.updContact(id, contact)


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

  componentWillReceiveProps(nextProps) {
    const {name, email, phone} = nextProps.contact
    
    this.setState({
      name,
      email,
      phone,
    });
}

  render() {
    let { name, email, phone, nameErr, emailErr, phoneErr} = this.state;
    
    return (
      <div className="card mb-3">
        <div className="card-header">Update Contact</div>
        <div className="card-body">
          <form onSubmit={this._onSubmit}>
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

export default connect(mapState, actions)(EditContact)
