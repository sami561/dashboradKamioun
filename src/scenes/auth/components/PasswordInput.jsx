import React, { useState } from "react";

const PasswordInput = ({
  label,
  placeholder,
  register,
  isError,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="text-input-container">
      <label htmlFor="password" className="input-label">
        {label}
      </label>
      <div className="password-input-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register}
          className={`text-input ${isError ? "input-error" : ""}`}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      {isError && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default PasswordInput;
