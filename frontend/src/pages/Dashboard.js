import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const API_BASE_URL = "http://localhost:8080/api/projects";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        fetchProjects(currentUser.uid);
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchProjects = async (userId) => {
    try {
      const res = await fetch(`${API_BASE_URL}?userId=${encodeURIComponent(userId)}`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const handleAddProject = async () => {
    const projectName = prompt("Enter Project Name:");
    if (projectName && user) {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const apiKey = `${user.displayName}-${projectName}-${randomNum}`;
      const newProject = {
        user_id: user.uid,
        name: projectName,
        api_key: apiKey,
      };

      try {
        const res = await fetch(API_BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProject),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to add project");
        }

        const createdProject = await res.json();
        setProjects((prev) => [...prev, createdProject]);
      } catch (error) {
        alert(`Error adding project: ${error.message}`);
      }
    }
  };

  const copyToClipboard = (apiKey) => {
    navigator.clipboard.writeText(apiKey).then(() => {
      alert("API key copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy: ", err);
    });
  };

  if (loading) return <p className="cyberpunk-text">Loading user data...</p>;

  return (
    <>
      <div className="dashboard-container">
        <h2 className="cyberpunk-heading centered">Hello, {user.displayName || "User"}!</h2>
        <p className="cyberpunk-subtext centered">Your email: {user.email}</p>

        <div className="projects-section">
          <h3 className="cyberpunk-subheading">Your Projects:</h3>

          {/* Add Project Button - Outside scroll view */}
          <div className="project-card add-card" onClick={handleAddProject}>+</div>
        </div>
      </div>

      {/* Scrollable project list */}
      <div className="horizontal-scroll">
        {projects.map((proj, index) => {
          const themeClass = index % 2 === 0 ? "blue" : "pink";
          return (
            <div
              key={proj.id || index}
              className={`project-card ${themeClass}`}
              onClick={() =>
                navigate(`/projectdetails/${encodeURIComponent(proj.api_key)}`)
              }
            >
              <strong>{proj.name}</strong>
              <p className="api-key">{proj.api_key}</p>
              <button onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(proj.api_key);
              }}>Copy API Key</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
