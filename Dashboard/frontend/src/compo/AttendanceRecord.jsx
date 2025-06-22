import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut, Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

const AttendanceRecord = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);
  const [chartType, setChartType] = useState("doughnut");

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get("http://localhost:5000/attendance");
      setAttendanceData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("❌ Error fetching attendance:", error);
    }
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    if (date) {
      const filtered = attendanceData.filter(record => record.Date === date);
      setFilteredData(filtered);
    } else {
      setFilteredData(attendanceData);
    }
  };

  const downloadAttendance = () => {
    const csvContent = "Name,Date,Lecture\n" +
      filteredData.map(record => `${record.Name},${record.Date},${record.Subject}`).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "attendance.csv");
  };

  const subjectCounts = {};
  filteredData.forEach(record => {
    const subject = record.Subject || "N/A";
    subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
  });

  const chartData = {
    labels: Object.keys(subjectCounts),
    datasets: [
      {
        label: "Lectures",
        data: Object.values(subjectCounts),
        backgroundColor: [
          "#007bff",
          "#28a745",
          "#ffc107",
          "#dc3545",
          "#6610f2",
          "#17a2b8",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        position: "right",
      },
      datalabels: {
        color: "#fff",
        formatter: (value, context) => {
          return `${context.chart.data.labels[context.dataIndex]} - ${value}`;
        },
        font: {
          weight: "bold",
        },
      },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case "pie":
        return <Pie data={chartData} options={chartOptions} />;
      case "bar":
        return <Bar data={chartData} options={chartOptions} />;
      case "doughnut":
      default:
        return <Doughnut data={chartData} options={{ ...chartOptions, cutout: "60%" }} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9f9f9", padding: "20px", textAlign: "center" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Attendance Record</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input type="date" value={selectedDate} onChange={handleDateChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
        <button onClick={downloadAttendance} style={{ backgroundColor: "#007bff", color: "white", padding: "8px 15px", borderRadius: "8px", border: "none", cursor: "pointer" }}>
          Download Attendance
        </button>
        <button onClick={() => setShowDashboard(!showDashboard)} style={{ backgroundColor: "#28a745", color: "white", padding: "8px 15px", borderRadius: "8px", border: "none", cursor: "pointer" }}>
          {showDashboard ? "Hide Dashboard" : "Show Dashboard"}
        </button>

        {showDashboard && (
          <select value={chartType} onChange={(e) => setChartType(e.target.value)} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}>
            <option value="doughnut">Doughnut</option>
            <option value="pie">Pie</option>
            <option value="bar">Bar</option>
          </select>
        )}
      </div>

      {showDashboard && (
        <div style={{ width: "80%", margin: "20px auto", backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          {renderChart()}
        </div>
      )}

      {!showDashboard && (
        <table style={{ width: "80%", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#007bff", color: "white" }}>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Name</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Date</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Lecture</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((record, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #ddd", backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white" }}>
                  <td style={{ padding: "12px" }}>{record.Name}</td>
                  <td style={{ padding: "12px" }}>{record.Date}</td>
                  <td style={{ padding: "12px" }}>{record.Subject || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", padding: "12px" }}>No attendance data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceRecord;
