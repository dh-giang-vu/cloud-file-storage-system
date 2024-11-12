import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";

import '../styles/AuthPage.css';

function SignupPage() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);
  }


  return (
    <div className="auth-container">
      <h2 className="auth-title">Create an Account</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
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
      </form>
      <p className="auth-footer">
        Already have an account? <Link to="../login">Login here</Link>.
      </p>
    </div>
  );
}

export default SignupPage;
