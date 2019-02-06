import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../Context";
import Axios from "axios";
import {Link} from 'react-router-dom'
export default class Contact extends Component {
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

  _onDelete = async (id, dispatch) => {
    try {
      const res = await Axios({
        url: `https://jsonplaceholder.typicode.com/users/${id}`,
        method: "delete"
      });

      if (res.status === 200)
        dispatch({
          type: "DELETE_CONTACT",
          payload: {
            id: id
          }
        });
    } catch (error) {
      dispatch({
        type: "DELETE_CONTACT",
        payload: {
          id: id
        }
      });
    }
  };

  render() {
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {value => {
          const { id, name, email, phone } = this.props.contact;
          const { dispatch } = value;
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
                  onClick={this._onDelete.bind(this, id, dispatch)}
                />
                <Link to={`/contact/edit/${id}`}>
                <i
                  className="fas fa-pencil-alt"
                  style={{ cursor: "pointer", float: "right", color: "black", marginRight: '1rem' }}
                  
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
        }}
      </Consumer>
    );
  }
}
