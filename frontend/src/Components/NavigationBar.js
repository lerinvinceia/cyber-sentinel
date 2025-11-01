import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <nav className="glass-navbar">
      <div className="nav-logo">Cyber Sentinel</div>
      <div className="nav-links">
        <a href="/Dashboard">Home</a>
        <a href="/about">About</a>
        {user ? (
          <div className="nav-user">
            <span>Welcome, {user.displayName || "User"}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
