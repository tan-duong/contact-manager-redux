import React, { Component } from "react";
import { Consumer } from "../../Context";
//mport uuid from "uuid";
import TextInputGroup from "../layout/TextInputGroup";
import Axios from "axios";

export default class EditContact extends Component {
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
    const res = await Axios({
      method: "get",
      url: `https://jsonplaceholder.typicode.com/users/${id}`
    });
    const { name, phone, email } = res.data;
    this.setState({
      name: name,
      phone: phone,
      email: email
    });
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

    const res = await Axios({
      method: "put",
      url: `https://jsonplaceholder.typicode.com/users/${id}`,
      data: contact
    });

    if (res.status === 200)
      dispatch({
        type: "UPDATE_CONTACT",
        payload: {
          contact: res.data
        }
      });

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
    const { name, email, phone, nameErr, emailErr, phoneErr } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
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
        }}
      </Consumer>
    );
  }
}
