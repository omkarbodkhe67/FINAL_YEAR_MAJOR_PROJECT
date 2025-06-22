import React, { useState, useEffect } from "react";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ title: "", deadline: "", file: null });

  useEffect(() => {
    const storedAssignments = JSON.parse(localStorage.getItem("assignments")) || [];
    setAssignments(storedAssignments);
  }, []);

  const handleFileUpload = (event) => {
    setNewAssignment({ ...newAssignment, file: event.target.files[0] });
  };

  const addAssignment = () => {
    if (!newAssignment.title || !newAssignment.deadline || !newAssignment.file) {
      alert("Please fill all fields and upload a file!");
      return;
    }

    const newEntry = {
      ...newAssignment,
      id: Date.now(),
      submitted: false,
      graded: false,
    };

    const updatedAssignments = [...assignments, newEntry];
    setAssignments(updatedAssignments);
    localStorage.setItem("assignments", JSON.stringify(updatedAssignments));

    setNewAssignment({ title: "", deadline: "", file: null });
  };

  const markAsSubmitted = (id) => {
    const updatedAssignments = assignments.map((a) => (a.id === id ? { ...a, submitted: true } : a));
    setAssignments(updatedAssignments);
    localStorage.setItem("assignments", JSON.stringify(updatedAssignments));
  };

  const gradeAssignment = (id) => {
    const grade = prompt("Enter Grade (A, B, C, etc.):");
    if (grade) {
      const updatedAssignments = assignments.map((a) =>
        a.id === id ? { ...a, graded: true, grade } : a
      );
      setAssignments(updatedAssignments);
      localStorage.setItem("assignments", JSON.stringify(updatedAssignments));
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        borderRadius: "12px",
        boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
        textAlign: "center",
        color: "#fff",
      }}
    >
      <h2 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "600" }}>📚 Teacher Assignment Dashboard</h2>

      {/* Assignment Upload Form */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Assignment Title"
          value={newAssignment.title}
          onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            outline: "none",
            fontSize: "16px",
          }}
        />
        <input
          type="date"
          value={newAssignment.deadline}
          onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            outline: "none",
            fontSize: "16px",
          }}
        />
        <input type="file" onChange={handleFileUpload} style={{ padding: "10px", borderRadius: "6px", border: "none" }} />
        <button
          onClick={addAssignment}
          style={{
            backgroundColor: "#ff4b5c",
            color: "white",
            padding: "12px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#ff1e3a")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4b5c")}
        >
          Upload Assignment
        </button>
      </div>

      {/* Assignment List Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px", background: "#fff", color: "#333", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
          <thead>
            <tr style={{ backgroundColor: "#007bff", color: "white" }}>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Title</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Deadline</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Status</th>
              <th style={{ padding: "12px", textAlign: "center", borderBottom: "2px solid #ddd" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <tr
                  key={assignment.id}
                  style={{
                    backgroundColor: assignment.submitted ? "#d4edda" : assignment.deadline < new Date().toISOString().split("T")[0] ? "#f8d7da" : "transparent",
                    borderBottom: "1px solid #ddd",
                    transition: "0.3s",
                  }}
                >
                  <td style={{ padding: "12px" }}>{assignment.title}</td>
                  <td style={{ padding: "12px" }}>{assignment.deadline}</td>
                  <td style={{ padding: "12px", color: assignment.submitted ? "green" : "red" }}>{assignment.submitted ? "Submitted" : "Pending"}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {!assignment.submitted && (
                      <button
                        onClick={() => markAsSubmitted(assignment.id)}
                        style={{
                          backgroundColor: "#28a745",
                          color: "white",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          border: "none",
                          cursor: "pointer",
                          marginRight: "6px",
                          transition: "0.3s",
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
                      >
                        Mark Submitted
                      </button>
                    )}
                    {assignment.submitted && !assignment.graded && (
                      <button
                        onClick={() => gradeAssignment(assignment.id)}
                        style={{
                          backgroundColor: "#ffc107",
                          color: "black",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          border: "none",
                          cursor: "pointer",
                          marginRight: "6px",
                          transition: "0.3s",
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#e0a800")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#ffc107")}
                      >
                        Grade
                      </button>
                    )}
                    {assignment.graded && <span style={{ fontWeight: "bold", color: "#28a745" }}>Grade: {assignment.grade}</span>}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "12px" }}>No assignments available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assignments;
