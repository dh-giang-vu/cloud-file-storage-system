import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useAuth } from "../security/AuthContext";

import '../styles/AuthPage.css';
import LoadingButton from "../components/LoadingButton";
import CloudIcon from "../assets/fs-icon-corner-removed.png";
import '../styles/App.css';

function LoginPage() {

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    login(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error ${errorCode}: ${errorMessage}`);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title" style={{ position: "relative", zIndex: 1 }}>
          Login
          <img
            src={CloudIcon}
            style={{
              width: "45px",
              position: "absolute",
              top: "-9px",
              left: "53px",
              zIndex: -1,
            }}
          />
        </h2>
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
        {/* <button type="submit" className="auth-button" onSubmit={() => {}}>Login</button> */}
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
          Login
        </LoadingButton>
        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up here</Link>.
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
