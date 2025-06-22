// src/components/admin/StudentData.jsx

import React, { useState } from "react";

const PlacementDetails = ({ studentName, setStudentName, setMessage }) => {
  const [contact, setContact] = useState("");
  const [program, setProgram] = useState("");
  const [employer, setEmployer] = useState("");
  const [employerContact, setEmployerContact] = useState("");
  const [packageLPA, setPackageLPA] = useState("");

  const handleSubmit = () => {
    if (!studentName || !contact || !program || !employer || !employerContact || !packageLPA) {
      setMessage("❌ Please fill all fields.");
      return;
    }

    // Just simulate success message
    setMessage("✅ Details captured successfully (not submitted to backend).");
  };

  return (
    <>
      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Contact Details"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Program Completed"
        value={program}
        onChange={(e) => setProgram(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Employer Name"
        value={employer}
        onChange={(e) => setEmployer(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Employer Contact"
        value={employerContact}
        onChange={(e) => setEmployerContact(e.target.value)}
        style={styles.input}
      />
      <input
        type="number"
        step="0.1"
        placeholder="Package (LPA)"
        value={packageLPA}
        onChange={(e) => setPackageLPA(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleSubmit} style={styles.button}>📨 Submit</button>
    </>
  );
};

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "2px solid #4facfe",
    borderRadius: "8px",
    marginBottom: "15px",
    transition: "0.3s",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    background: "#4CAF50",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default PlacementDetails;
