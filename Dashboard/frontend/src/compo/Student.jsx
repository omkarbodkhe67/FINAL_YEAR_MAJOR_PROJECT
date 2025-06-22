import React, { useState } from "react";

const Student = () => {
  const [selectedSection, setSelectedSection] = useState("assignments");

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Math Assignment",
      subject: "Math",
      deadline: "2025-04-10",
      file: "math.pdf",
      submitted: false,
      studentFile: null,
    },
    {
      id: 2,
      title: "Physics Lab Report",
      subject: "Physics",
      deadline: "2025-04-15",
      file: "physics.pdf",
      submitted: false,
      studentFile: null,
    },
  ]);

  const [eventData, setEventData] = useState({
    eventName: "",
    organizerName: "",
    eventPlace: "",
    eventLevel: "",
    eventType: "",
    fromDate: "",
    toDate: "",
    academicYear: "",
    certificate: null,
  });

  const [placementData, setPlacementData] = useState({
    studentName: "",
    contact: "",
    program: "",
    employer: "",
    employerContact: "",
    package: "",
  });

  const handlePlacementChange = (e) => {
    const { name, value } = e.target;
    setPlacementData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitPlacement = (e) => {
    e.preventDefault();

    const storedPlacements =
      JSON.parse(localStorage.getItem("placementSubmissions")) || [];

    const newPlacement = { ...placementData };

    localStorage.setItem(
      "placementSubmissions",
      JSON.stringify([...storedPlacements, newPlacement])
    );

    setPlacementData({
      studentName: "",
      contact: "",
      program: "",
      employer: "",
      employerContact: "",
      package: "",
    });

    alert("✅ Placement submitted successfully!");
  };

  const handleFileUpload = (event, assignmentId) => {
    const file = event.target.files[0];
    setAssignments(
      assignments.map((a) =>
        a.id === assignmentId ? { ...a, studentFile: file } : a
      )
    );
  };

  const submitAssignment = (id) => {
    setAssignments(
      assignments.map((a) => (a.id === id ? { ...a, submitted: true } : a))
    );
  };

  const handleEventChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "certificate") {
      const file = files[0];
      if (file && file.type !== "application/pdf") {
        alert("❌ Please upload a PDF file only.");
        return;
      }

      setEventData((prev) => ({
        ...prev,
        certificate: file,
      }));
    } else {
      setEventData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onloadend = () => {
      const certificateUrl = reader.result;

      const storedEvents =
        JSON.parse(localStorage.getItem("eventSubmissions")) || [];

      const newEvent = {
        ...eventData,
        certificate: certificateUrl,
      };

      localStorage.setItem(
        "eventSubmissions",
        JSON.stringify([...storedEvents, newEvent])
      );

      setEventData({
        eventName: "",
        organizerName: "",
        eventPlace: "",
        eventLevel: "",
        eventType: "",
        fromDate: "",
        toDate: "",
        academicYear: "",
        certificate: null,
      });

      alert("✅ Event submitted successfully!");
    };

    if (eventData.certificate) {
      reader.readAsDataURL(eventData.certificate);
    } else {
      alert("Please upload a certificate.");
    }
  };

  const renderSectionCard = (title, sectionKey, emoji) => (
    <div
      onClick={() => setSelectedSection(sectionKey)}
      style={{
        cursor: "pointer",
        padding: "20px",
        flex: 1,
        borderRadius: "12px",
        backgroundColor:
          selectedSection === sectionKey ? "#007bff" : "#f0f0f0",
        color: selectedSection === sectionKey ? "#fff" : "#333",
        fontWeight: "bold",
        fontSize: "18px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        transition: "0.3s",
        margin: "0 10px",
        border:
          selectedSection === sectionKey
            ? "2px solid #0056b3"
            : "2px solid #ccc",
      }}
    >
      {emoji} {title}
    </div>
  );

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "30px",
        backgroundColor: "#f4f4f9",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        textAlign: "center",
        border: "2px solid #ccc",
      }}
    >
      <h2
        style={{
          color: "#333",
          marginBottom: "30px",
          fontSize: "26px",
          fontWeight: "bold",
        }}
      >
        🎓 Student Dashboard
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        {renderSectionCard("Assignments", "assignments", "📘")}
        {renderSectionCard("Event Participation", "events", "🎉")}
        {renderSectionCard("Placement Submission", "placement", "🏢")}
      </div>

      {/* Assignment Section */}
      {selectedSection === "assignments" && (
        <div
          style={{
            border: "2px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            backgroundColor: "#f4f4f9",
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
              fontSize: "22px",
              color: "#007bff",
              fontWeight: "bold",
            }}
          >
            📘 Student Assignment Portal
          </h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  fontSize: "16px",
                  textAlign: "left",
                }}
              >
                <th style={{ padding: "14px", border: "2px solid #ddd" }}>
                  Title
                </th>
                <th style={{ padding: "14px", border: "2px solid #ddd" }}>
                  Subject
                </th>
                <th style={{ padding: "14px", border: "2px solid #ddd" }}>
                  Deadline
                </th>
                <th
                  style={{
                    padding: "14px",
                    border: "2px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: "14px",
                    border: "2px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr
                  key={assignment.id}
                  style={{
                    backgroundColor: assignment.submitted
                      ? "#d4edda"
                      : assignment.deadline <
                        new Date().toISOString().split("T")[0]
                      ? "#f8d7da"
                      : "#fff",
                  }}
                >
                  <td
                    style={{
                      padding: "14px",
                      border: "2px solid #ddd",
                      fontWeight: "bold",
                    }}
                  >
                    {assignment.title}
                  </td>
                  <td style={{ padding: "14px", border: "2px solid #ddd" }}>
                    {assignment.subject}
                  </td>
                  <td style={{ padding: "14px", border: "2px solid #ddd" }}>
                    {assignment.deadline}
                  </td>
                  <td
                    style={{
                      padding: "14px",
                      border: "2px solid #ddd",
                      fontWeight: "bold",
                      color: assignment.submitted ? "green" : "red",
                      textAlign: "center",
                    }}
                  >
                    {assignment.submitted ? "✅ Submitted" : "⏳ Pending"}
                  </td>
                  <td
                    style={{
                      padding: "14px",
                      border: "2px solid #ddd",
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <a
                      href={assignment.file}
                      download
                      style={{
                        textDecoration: "none",
                        color: "#007bff",
                        fontWeight: "bold",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        backgroundColor: "#e3f2fd",
                        border: "1px solid #007bff",
                      }}
                    >
                      📥 Download
                    </a>
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, assignment.id)}
                      style={{
                        padding: "6px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        fontSize: "14px",
                        backgroundColor: "#fff",
                      }}
                    />
                    <button
                      onClick={() => submitAssignment(assignment.id)}
                      style={{
                        backgroundColor: assignment.submitted
                          ? "#ccc"
                          : "#28a745",
                        color: "white",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        border: "none",
                        cursor: assignment.submitted ? "not-allowed" : "pointer",
                        fontWeight: "bold",
                      }}
                      disabled={assignment.submitted}
                    >
                      {assignment.submitted ? "✅ Submitted" : "📤 Submit"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Placement Submission Section */}
      {selectedSection === "placement" && (
        <div
          style={{
            border: "2px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            backgroundColor: "#f4f4f9",
            textAlign: "left",
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
              fontSize: "22px",
              color: "#007bff",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            🏢 Placement Submission Form
          </h3>
          <form onSubmit={handleSubmitPlacement}>
            {[
              "studentName",
              "contact",
              "program",
              "employer",
              "employerContact",
              "package",
            ].map((name) => (
              <div key={name} style={{ marginBottom: "15px" }}>
                <label style={{ fontWeight: "bold", display: "block" }}>
                  {name
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (s) => s.toUpperCase())}
                  :
                </label>
                <input
                  type={
                    name.includes("contact") || name === "package"
                      ? "number"
                      : "text"
                  }
                  name={name}
                  value={placementData[name]}
                  onChange={handlePlacementChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    backgroundColor: "#fff",
                  }}
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              🚀 Submit Placement
            </button>
          </form>
        </div>
      )}

      {/* Event Participation Section */}
      {selectedSection === "events" && (
        <div
          style={{
            border: "2px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            backgroundColor: "#f4f4f9",
            textAlign: "left",
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
              fontSize: "22px",
              color: "#007bff",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            🎉 Event Participation Form
          </h3>
          <form onSubmit={handleSubmitEvent}>
            {[
              ["eventName", "Event Name"],
              ["organizerName", "Organizer Name"],
              ["eventPlace", "Event Place"],
              [
                "eventLevel",
                "Event Level (college/state/national/international)",
              ],
              ["eventType", "Event Type (Technical/Cultural/Sports)"],
              ["fromDate", "From Date"],
              ["toDate", "To Date"],
              ["academicYear", "Academic Year"],
            ].map(([name, label]) => (
              <div key={name} style={{ marginBottom: "15px" }}>
                <label style={{ fontWeight: "bold", display: "block" }}>
                  {label}:
                </label>
                <input
                  type={name.includes("Date") ? "date" : "text"}
                  name={name}
                  value={eventData[name]}
                  onChange={handleEventChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    backgroundColor: "#fff",
                  }}
                />
              </div>
            ))}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontWeight: "bold", display: "block" }}>
                Certificate Upload (PDF only):
              </label>
              <input
                type="file"
                name="certificate"
                accept="application/pdf"
                onChange={handleEventChange}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                  backgroundColor: "#fff",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              🚀 Submit Event
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Student;
