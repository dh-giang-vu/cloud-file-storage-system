import React from "react";

function FormInput({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="form-input"
      value={value}
      onChange={onChange}
      required
    />
  );
}

export default FormInput;
