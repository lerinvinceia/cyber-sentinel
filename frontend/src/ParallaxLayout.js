import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./index.css";
import Navbar from "./Components/NavigationBar"; // Adjust the import path as necessary

const ParallaxLayout = ({ children }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const location = useLocation();

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setOffset({ x, y });
  };

  // Show fg-layer only on login or register
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="scene" onMouseMove={handleMouseMove}>
      <div
        className="bg-layer"
        style={{
          transform: `translate(${offset.x * 50}px, ${offset.y * 20}px)`,
        }}
      />
     {isAuthPage && (
  <div
    className="fg-layer"
    style={{
      transform: `translate(${offset.x * 650}px, ${offset.y * 650}px)`,
    }}
  />
)}


            <Navbar />
      <div className="content">{children}</div>
    </div>
  );
};

export default ParallaxLayout;
