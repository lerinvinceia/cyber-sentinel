import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ParallaxLayout from "./ParallaxLayout";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";
import About from "./pages/about";

function App() {
  return (
    <Router>
      <ParallaxLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/projectdetails/:apiKey" element={<ProjectDetails />} />
         <Route path="/about" element={<About />} />
      </Routes>
      </ParallaxLayout>
    </Router>
  );
}

export default App;
