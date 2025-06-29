import React from "react";

const TextInput = ({ label, placeholder, register, isError, errorMessage }) => {
  return (
    <div className="text-input-container">
      <label htmlFor="username" className="input-label">
        {label}
      </label>
      <input
        placeholder={placeholder}
        {...register}
        className={`text-input ${isError ? "input-error" : ""}`}
      />
      {isError && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default TextInput;
