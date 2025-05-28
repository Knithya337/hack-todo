import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setErrorMsg("");
    setSuccessMsg("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      setErrorMsg("Please enter a valid email.");
      return;
    }
    if (formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    try {
      const res = await fetch("http://localhost/react-auth-backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("userEmail", data.user.email);
        setSuccessMsg("Login successful! Redirecting...");
        setTimeout(() => navigate("/todo"), 1500);
      } else {
        setErrorMsg(data.message || "Login failed.");
      }
    } catch (err) {
      setErrorMsg("Server error. Please try again later.");
      console.error("Login error:", err);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={{ marginBottom: 20, color: "#2c3e50" }}>Welcome Back!</h2>

        {errorMsg && <div style={styles.error}>{errorMsg}</div>}
        {successMsg && <div style={styles.success}>{successMsg}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button
            type="submit"
            disabled={
              !formData.email || !formData.password || errorMsg.length > 0
            }
            style={{
              ...styles.button,
              backgroundColor:
                !formData.email || !formData.password ? "#bdc3c7" : "#2980b9",
              cursor:
                !formData.email || !formData.password ? "not-allowed" : "pointer",
            }}
          >
            Login
          </button>
        </form>

        <div style={styles.divider}>OR</div>

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);
            localStorage.setItem("userEmail", decoded.email);
            fetch("http://localhost/react-auth-backend/google_login.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: decoded.email,
                name: decoded.name,
              }),
            })
              .then((res) => res.json())
              .then(() => navigate("/todo"))
              .catch(() =>
                setErrorMsg("Google login failed, please try again later.")
              );
          }}
          onError={() => {
            setErrorMsg("Google Login Failed");
          }}
          useOneTap
        />

        <button
          onClick={() => navigate("/signup")}
          style={styles.linkButton}
          aria-label="Create account"
        >
          Don't have an account? Create one
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
     position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
   
    overflow: "hidden",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  container: {
    background: "white",
    padding: 30,
    borderRadius: 12,
    width: "100%",
    maxWidth: 400,
    boxShadow:
      "0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    marginBottom: 20,
  },
  input: {
    padding: "12px 15px",
    fontSize: 16,
    borderRadius: 8,
    border: "1.5px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  button: {
    padding: "12px 15px",
    fontSize: 18,
    borderRadius: 8,
    border: "none",
    color: "white",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
  },
  divider: {
    margin: "15px 0",
    fontWeight: "bold",
    color: "#7f8c8d",
  },
  error: {
    backgroundColor: "#f8d7da",
    color: "#842029",
    padding: "10px 15px",
    borderRadius: 6,
    marginBottom: 15,
    fontWeight: "600",
  },
  success: {
    backgroundColor: "#d1e7dd",
    color: "#0f5132",
    padding: "10px 15px",
    borderRadius: 6,
    marginBottom: 15,
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 10,
    background: "none",
    border: "none",
    color: "#2980b9",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: 14,
    fontWeight: "600",
  },
};

export default Login;
