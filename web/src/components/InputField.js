import React from "react";

const InputField = ({ type, name, placeholder, value, onChange, required }) => (
  <div className="input-field">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default InputField;