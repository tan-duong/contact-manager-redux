import React from "react";
import PropTypes from "prop-types";
import classnames from 'classnames'
const TextInputGroup = ({ name, placeholder, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor="name">{name}</label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        className={classnames('form-control form-control-lg', {
          "is-invalid": error
        })}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextInputGroup.propsType = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};

export default TextInputGroup;
