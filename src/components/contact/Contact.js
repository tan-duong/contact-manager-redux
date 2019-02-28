import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {deleteContact} from '../../redux/actions/contact'

class Contact extends Component {
  static propTypes = {
    contact: PropTypes.object.isRequired
  };

  state = {
    showContactInfo: false
  };

  _onClick = () => {
    this.setState({
      showContactInfo: !this.state.showContactInfo
    });
  };

  _onDelete = async (id) => {
    const {deleteContact} = this.props
    deleteContact(id)
  };

  render() {
    const { showContactInfo } = this.state;
    const {name, email, phone, id} = this.props.contact

    return (
      <div className="card card-body mb-3">
        <h4>
          {name}{" "}
          <i
            onClick={this._onClick}
            className="fas fa-sort-down"
            style={{ cursor: "pointer" }}
          />
          <i
            className="fas fa-times"
            style={{ cursor: "pointer", float: "right", color: "red" }}
            onClick={this._onDelete.bind(this, id)}
          />
          <Link to={`/contact/edit/${id}`}>
            <i
              className="fas fa-pencil-alt"
              style={{
                cursor: "pointer",
                float: "right",
                color: "black",
                marginRight: "1rem"
              }}
            />
          </Link>
        </h4>
        {showContactInfo ? (
          <ul className="list-group">
            <li className="list-group-item">Email: {email}</li>
            <li className="list-group-item">Phone: {phone}</li>
          </ul>
        ) : null}
      </div>
    );
  }
}


const actions = {
  deleteContact,
} 

export default connect(null, actions)(Contact)
