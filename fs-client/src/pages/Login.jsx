import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useAuth } from "../security/AuthContext";

import '../styles/AuthPage.css';

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error ${errorCode}: ${errorMessage}`);
      });
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Login</h2>
        <FormInput 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}  
        />
        <FormInput 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" className="auth-button" onSubmit={() => {}}>Login</button>
        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up here</Link>.
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
