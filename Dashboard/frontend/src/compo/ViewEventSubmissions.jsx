import React, { useEffect, useState } from "react";

const ViewEventSubmissions = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("eventSubmissions")) || [];
    setEvents(stored);
  }, []);

  const deleteEvent = (index) => {
    const updated = [...events];
    updated.splice(index, 1);
    setEvents(updated);
    localStorage.setItem("eventSubmissions", JSON.stringify(updated));
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "30px",
        background: "#f9f9f9",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        border: "1px solid #e0e0e0",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          marginBottom: "25px",
          color: "#333",
          fontSize: "28px",
          borderBottom: "2px solid #007bff",
          paddingBottom: "10px",
        }}
      >
        📋 Event Participation Submissions
      </h2>
      {events.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No submissions yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#007bff", color: "#fff", textAlign: "left" }}>
                <th style={thStyle}>Event</th>
                <th style={thStyle}>Organizer</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Dates</th>
                <th style={thStyle}>Certificate</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e, idx) => (
                <tr
                  key={idx}
                  style={{
                    background: idx % 2 === 0 ? "#fff" : "#f1f7ff",
                    transition: "background 0.3s ease",
                  }}
                >
                  <td style={tdStyle}>{e.eventName}</td>
                  <td style={tdStyle}>{e.organizerName}</td>
                  <td style={tdStyle}>{e.eventType}</td>
                  <td style={tdStyle}>{e.eventLevel}</td>
                  <td style={tdStyle}>
                    {e.fromDate} - {e.toDate}
                  </td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    {e.certificate ? (
                      <div>
                        <embed
                          src={e.certificate}
                          type="application/pdf"
                          width="100"
                          height="100"
                          style={{ borderRadius: "6px", border: "1px solid #ccc" }}
                        />
                        <br />
                        <a
                          href={e.certificate}
                          download={`Certificate_${e.eventName || "event"}.pdf`}
                          style={downloadBtnStyle}
                        >
                          ⬇ Download
                        </a>
                      </div>
                    ) : (
                      <span style={{ color: "#d9534f", fontWeight: "bold" }}>
                        Not Uploaded
                      </span>
                    )}
                  </td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    <button
                      onClick={() => deleteEvent(idx)}
                      style={deleteBtnStyle}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const thStyle = {
  padding: "12px 16px",
  border: "1px solid #ddd",
  fontWeight: "600",
  fontSize: "15px",
};

const tdStyle = {
  padding: "12px 16px",
  border: "1px solid #eee",
  fontSize: "14px",
  color: "#333",
};

const downloadBtnStyle = {
  backgroundColor: "#28a745",
  color: "white",
  padding: "6px 12px",
  borderRadius: "5px",
  textDecoration: "none",
  fontSize: "13px",
  marginTop: "6px",
  display: "inline-block",
};

const deleteBtnStyle = {
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
};

export default ViewEventSubmissions;
