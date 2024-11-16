import { useState } from "react";
import { Link } from "react-router-dom";
import { createNewAccount } from "../scripts/api";
import FormInput from "../components/FormInput";

import '../styles/AuthPage.css';
import LoadingButton from "../components/LoadingButton";
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';

function SignupPage() {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    if (!validatePassword()) {
      alert("Password did not match with Confirm Password. Try again.");
      setLoading(false);
      return;
    }

    createNewAccount(username, email, password)
      .then(() => setSuccess(true))
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }

  const validatePassword = () => {
    return password === confirmPassword;
  }

  if (success) {
    return (
      <div className="auth-container">
        <div className="success-card">
          <h2>Account Registered!</h2>
          <p>Your account has been created.</p>
          <TaskAltOutlinedIcon sx={{ width: "75px", height: "auto", marginTop: "8px", marginBottom: "-12px" }}/>
          <br />
          <Link to="/login" className="login-link">Go to Login</Link>
        </div>
      </div>
    )
  }
  else {

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
          {/* <button type="submit" className="auth-button" onSubmit={() => {}}>Sign Up</button> */}
          <LoadingButton
            type="submit"
            loading={loading}
            additionalStyles={{
              padding: "8px",
              backgroundColor: "var(--button-color)",
              color: "var(--button-text-color)",
              border: "none",
              borderRadius: "var(--border-radius)",
              fontSize: "16px",
              width: "100%",
              cursor: "pointer",
              transition: "background-color 0.3s",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#357abd",
              },
            }}
            onSubmit={() => { }}
          >
            Sign Up
          </LoadingButton>
          {loading ?
            (
              <p className="auth-footer" style={{ textAlign: "center", color: "#fc1c1c" }}>
                Hi, the server is deployed on Render.com for free, so this could take 50 seconds or more.
              </p>) :
            (
              <p className="auth-footer">
                Already have an account? <Link to="../login">Login here</Link>.
              </p>
            )
          }
        </form>
      </div>
    );
  }

}

export default SignupPage;
