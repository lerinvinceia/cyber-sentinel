import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line,
} from 'recharts';
//import "./ProjectDetails.css";

const ProjectDetails = () => {
  const { apiKey } = useParams();
  const [logs, setLogs] = useState([]);
  const [ipFilter, setIpFilter] = useState("");
  const [eventFilter, setEventFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("table");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/events/${apiKey}`);
        const logsWithParsedExtraInfo = response.data.map((log) => ({
          ...log,
          extra_info: JSON.parse(log.extra_info),
        }));
        setLogs(logsWithParsedExtraInfo);
      } catch (error) {
        console.error("Failed to fetch logs", error);
      }
    };
    fetchLogs();
  }, [apiKey]);

  const filteredLogs = logs.filter((log) => {
    const matchesIp = ipFilter ? log.extra_info.ip.includes(ipFilter) : true;
    const matchesEvent = eventFilter ? log.event_key.includes(eventFilter) : true;
    const matchesDate =
      fromDate && toDate
        ? new Date(log.timestamp) >= new Date(fromDate) && new Date(log.timestamp) <= new Date(toDate)
        : true;
    return matchesIp && matchesEvent && matchesDate;
  });

  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const eventCounts = filteredLogs.reduce((acc, log) => {
    acc[log.event_key] = (acc[log.event_key] || 0) + 1;
    return acc;
  }, {});

  const ipCounts = filteredLogs.reduce((acc, log) => {
    const ip = log.extra_info.ip;
    acc[ip] = (acc[ip] || 0) + 1;
    return acc;
  }, {});

  const radarData = Object.entries(eventCounts).map(([event, count]) => ({
    subject: event,
    A: count,
  }));

  const barData = Object.entries(ipCounts).map(([ip, count]) => ({
    ip,
    count,
  }));

  const generatePDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");

    // Header
    doc.setFontSize(18);
    doc.setTextColor(0, 255, 255);
    doc.text("Cyber Sentinel - Event Report", 14, 20);
    doc.setDrawColor(0, 255, 255);
    doc.line(14, 22, 200, 22);

    // Filters
    doc.setFontSize(11);
    doc.setTextColor(0);
    let y = 30;
    doc.text(`API Key: ${apiKey}`, 14, y);
    if (ipFilter) doc.text(`IP Filter: ${ipFilter}`, 14, (y += 6));
    if (eventFilter) doc.text(`Event Filter: ${eventFilter}`, 14, (y += 6));
    if (fromDate && toDate)
      doc.text(
        `Date Range: ${new Date(fromDate).toLocaleString()} - ${new Date(toDate).toLocaleString()}`,
        14,
        (y += 6)
      );

    // Logs Table
    autoTable(doc, {
      head: [["Timestamp", "Event", "Message", "IP", "Browser"]],
      body: filteredLogs.map((log) => [
        new Date(log.timestamp).toLocaleString(),
        log.event_key,
        log.message,
        log.extra_info.ip,
        log.extra_info.browser,
      ]),
      startY: y + 10,
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [0, 255, 255], textColor: [0, 0, 0] },
    });

    // Charts
    const chartSection = document.querySelector(".charts-wrapper");
    if (chartSection) {
      const canvas = await html2canvas(chartSection);
      const imgData = canvas.toDataURL("image/png");
      doc.addPage();
      doc.setFontSize(14);
      doc.setTextColor(0, 255, 255);
      doc.text("Visual Analytics", 14, 20);
      doc.addImage(imgData, "PNG", 10, 30, 190, 130);
    }

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text(`Page ${i} of ${pageCount}`, 180, 290);
    }

    doc.save("event_report.pdf");
  };

  return (
    <div className="page-wrapper scroll-view">
      <div className="table-container">
        <h2 className="table-title">
          Project Details for <code className="api-key1">{apiKey}</code>
        </h2>

        <div className="view-toggle-buttons">
          <button className={`view-button ${view === "table" ? "active" : ""}`} onClick={() => setView("table")}>
            Table
          </button>
          <button className={`view-button ${view === "charts" ? "active" : ""}`} onClick={() => setView("charts")}>
            Charts
          </button>
          <button className={`view-button ${view === "reports" ? "active" : ""}`} onClick={() => setView("reports")}>
            Reports
          </button>
        </div>

        <div className="filters">
          <input type="text" placeholder="Filter by IP" value={ipFilter} onChange={(e) => setIpFilter(e.target.value)} className="filter-input" />
          <input type="text" placeholder="Filter by Event Type" value={eventFilter} onChange={(e) => setEventFilter(e.target.value)} className="filter-input" />
        </div>

        {view === "table" && (
          <>
            <div className="table-scroll">
              <table className="log-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Event</th>
                    <th>Message</th>
                    <th>IP</th>
                    <th>Browser</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLogs.map((log, idx) => (
                    <tr key={idx} title={`IP: ${log.extra_info.ip}`}>
                      <td>{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="event-cell">{log.event_key}</td>
                      <td>{log.message}</td>
                      <td>{log.extra_info.ip}</td>
                      <td>{log.extra_info.browser}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination-controls">
              <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="pagination-button">
                ←
              </button>
              <span className="pagination-page">Page {currentPage}</span>
              <button onClick={() => setCurrentPage((prev) => (prev * itemsPerPage < filteredLogs.length ? prev + 1 : prev))} disabled={currentPage * itemsPerPage >= filteredLogs.length} className="pagination-button">
                →
              </button>
            </div>
          </>
        )}

        {view === "charts" && (
          <div className="charts-wrapper">
            <div className="chart-row">
              <RadarChart cx={200} cy={200} outerRadius={150} width={400} height={400} data={radarData}>
                <PolarGrid stroke="#0ff" />
                <PolarAngleAxis dataKey="subject" stroke="#0ff" />
                <PolarRadiusAxis stroke="#0ff" />
                <Radar name="Events" dataKey="A" stroke="#0ff" fill="#0ff" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#0ff', color: '#0ff' }} />
              </RadarChart>
            </div>
            <div className="chart-row">
              <BarChart width={500} height={300} data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0ff" />
                <XAxis dataKey="ip" stroke="#0ff" />
                <YAxis stroke="#0ff" />
                <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#0ff', color: '#0ff' }} />
                <Legend />
                <Bar dataKey="count" fill="#0ff" />
              </BarChart>
            </div>
            <div className="chart-row">
              <LineChart width={500} height={300} data={filteredLogs.map((log, idx) => ({ name: idx, value: 1, ip: log.extra_info.ip }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0ff" />
                <XAxis dataKey="name" stroke="#0ff" />
                <YAxis stroke="#0ff" />
                <Tooltip formatter={(val, name, props) => `IP: ${props.payload.ip}`} contentStyle={{ backgroundColor: '#000', borderColor: '#0ff', color: '#0ff' }} />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#0ff" />
              </LineChart>
            </div>
          </div>
        )}

        {view === "reports" && (
          <div className="report-section">
            <div className="report-filters">
              <input type="datetime-local" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="filter-input" />
              <input type="datetime-local" value={toDate} onChange={(e) => setToDate(e.target.value)} className="filter-input" />
              <button className="download-button" onClick={generatePDF}>Download Report</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
