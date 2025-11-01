// src/Register.js
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import { Link } from "react-router-dom";
import "./register.css";


const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await updateProfile(userCredential.user, { displayName: form.username });
      alert("Registration successful!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
   <div className="register-container">
  <form onSubmit={handleSubmit} className="register-form">
    <h2>Register</h2>
    <input
      name="username"
      placeholder="Username"
      onChange={handleChange}
      required
    />
    <input
      type="email"
      name="email"
      placeholder="Email"
      onChange={handleChange}
      required
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      onChange={handleChange}
      required
    />
    <button type="submit">Register</button>
    <p>
      Already have an account? <Link to="/login" className="login-link">Login here</Link>
    </p>
  </form>
</div>

  
  );
};

export default Register;
