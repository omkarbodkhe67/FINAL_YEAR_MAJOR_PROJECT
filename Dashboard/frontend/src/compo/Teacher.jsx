import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [showPlacements, setShowPlacements] = useState(false);
  const [placementData, setPlacementData] = useState([]);

  useEffect(() => {
    const storedPlacements = JSON.parse(localStorage.getItem("placements") || "[]");
    setPlacementData(storedPlacements);
  }, []);

  const dashboardItems = [
    { label: "Attendance Record", path: "/attendance-record", color: "#007bff" },
    { label: "Attendance Percentage", path: "/attendance-percentage", color: "#28a745" },
    { label: "Assignments", path: "/assignments", color: "#ffc107" },
    { label: "View Event Submissions", path: "/view-event-submissions", color: "#17a2b8" },
    {
      label: showPlacements ? "Hide Placement Submissions" : "View Placement Submissions",
      action: () => setShowPlacements(!showPlacements),
      color: "#6f42c1",
    },
  ];

  const handleClick = (item) => {
    if (item.path) {
      navigate(item.path);
    } else if (item.action) {
      item.action();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "50px 20px",
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          textAlign: "center",
          padding: "40px",
          border: "2px solid #e0e0e0",
        }}
      >
        <h2
          style={{
            color: "#333",
            marginBottom: "30px",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          👩‍🏫 Teacher Dashboard
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {dashboardItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(item)}
              style={{
                backgroundColor: item.color,
                color: "#fff",
                padding: "25px",
                borderRadius: "12px",
                fontWeight: "bold",
                fontSize: "20px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {item.label}
            </div>
          ))}
        </div>

        {showPlacements && (
          <div
            style={{
              marginTop: "40px",
              backgroundColor: "#f8f9fa",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
              textAlign: "left",
            }}
          >
            <h3 style={{ fontSize: "24px", marginBottom: "20px", textAlign: "center" }}>
              🧾 Submitted Placements
            </h3>
            {placementData.length === 0 ? (
              <p style={{ textAlign: "center" }}>No placement submissions found.</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#dee2e6" }}>
                    <th style={thStyle}>Student Name</th>
                    <th style={thStyle}>Company</th>
                    <th style={thStyle}>Role</th>
                    <th style={thStyle}>Package</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Academic Year</th>
                  </tr>
                </thead>
                <tbody>
                  {placementData.map((item, idx) => (
                    <tr key={idx}>
                      <td style={tdStyle}>{item.name}</td>
                      <td style={tdStyle}>{item.company}</td>
                      <td style={tdStyle}>{item.role}</td>
                      <td style={tdStyle}>{item.package}</td>
                      <td style={tdStyle}>{item.date}</td>
                      <td style={tdStyle}>{item.academicYear}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const thStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  fontWeight: "bold",
  textAlign: "center",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  textAlign: "center",
};

export default TeacherDashboard;
