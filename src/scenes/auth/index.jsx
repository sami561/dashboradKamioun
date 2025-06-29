import "./LoginForm.css";
import Logo from "../../assets/kamioun-logo.png";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { useState } from "react";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-page-container">
      <div className="login-box">
        <div className="login-content">
          <div className="logo-container">
            <img src={Logo} alt="logo" className="logo-image" />
          </div>
          <div className="auth-toggle">
            <button
              className={`toggle-button ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`toggle-button ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>
          <div className="divider" />

          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
