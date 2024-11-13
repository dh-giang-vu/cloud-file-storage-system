import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createNewAccount } from "../scripts/api";
import FormInput from "../components/FormInput";

import '../styles/AuthPage.css';

function SignupPage() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    createNewAccount(username, email, password)
      .then(() => navigate("/login"))
      .catch((error) => alert(error));
  }


  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Create an Account</h2>
        <FormInput 
          type="text" 
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
        />
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
        <FormInput 
          type="password" 
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}  
        />
        <button type="submit" className="auth-button" onSubmit={() => {}}>Sign Up</button>
        <p className="auth-footer">
          Already have an account? <Link to="../login">Login here</Link>.
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
