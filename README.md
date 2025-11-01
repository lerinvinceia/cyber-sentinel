# 🛡️ Cyber Sentinel

### 🔍 Overview
**Cyber Sentinel** is a full-stack security analytics platform that tracks and visualizes client-side security events in real time.  
The system combines **React**, **Firebase Authentication**, and a **Spring Boot + PostgreSQL** backend to deliver seamless monitoring, analysis, and alerting for potential threats.

---

## ⚙️ Key Features

- **🌐 IP-Based Event Tracking**  
  Automatically fetches and logs the client’s public IP address using a live IP API for every event, enabling location-based insights and correlation.

- **📊 Real-Time Event Logging**  
  Captures and stores 50+ daily client-side events with timestamps, IPs, and security context.

- **📈 Interactive Dashboard**  
  Displays security events visually through charts, tables, and filters for efficient monitoring and investigation.

- **🔐 Firebase Authentication**  
  Secure login and registration system to manage user access and maintain isolated sessions.

- **☁️ Spring Boot + PostgreSQL Backend**  
  A reliable backend for event management, analytics, and secure data handling.

- **🧩 Modular React Frontend**  
  Built with reusable components, responsive design, and real-time data updates.

---

## 🧠 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React, Firebase Auth, REST APIs, Chart.js |
| **Backend** | Spring Boot, PostgreSQL, JPA |
| **Integration** | IP Lookup API (for client geolocation) |
| **Tools** | Git, VS Code, IntelliJ, Postman |

---

📡 API Integration

Cyber Sentinel integrates an IP Lookup API to automatically detect the client's public IP and enrich event logs with regional context.
Example API used:

https://api.ipify.org?format=json

🛠️ Future Enhancements

Real-time alert system for unusual IP activity

Role-based dashboards for administrators

Integration with third-party security intelligence APIs

Enhanced visualization for threat correlation
