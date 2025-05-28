import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost/react-auth-backend/signup.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if (data.success) {
          navigate("/");
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Your Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            style={styles.input}
            required
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            style={styles.input}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        <p style={styles.linkText}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    margin: 0,
    padding: 0,
    background: "linear-gradient(to right, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "90%",
    maxWidth: "400px",
  },
  title: {
    marginBottom: "20px",
    fontSize: "28px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#4e54c8",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s ease",
  },
  linkText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#555",
  },
  link: {
    color: "#4e54c8",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Signup;
