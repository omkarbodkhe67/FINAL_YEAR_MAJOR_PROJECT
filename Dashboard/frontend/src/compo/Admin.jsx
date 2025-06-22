import React, { useState } from "react";
import axios from "axios";

const Admin = () => {
  const [studentName, setStudentName] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [isCardOpen, setIsCardOpen] = useState(false);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleUpload = async () => {
    if (!studentName || images.length === 0) {
      setMessage("❌ Please enter a student name and select images.");
      return;
    }

    const formData = new FormData();
    formData.append("studentName", studentName);
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post("http://localhost:5000/upload", formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("❌ Upload failed. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1
          style={styles.title}
          onClick={() => setIsCardOpen(!isCardOpen)}
        >
          📸 Upload Student Images
        </h1>

        {isCardOpen && (
          <>
            <input
              type="text"
              placeholder="Enter Student Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              style={styles.input}
            />

            <label htmlFor="file-upload" style={styles.fileLabel}>
              Select Images 📂
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={styles.fileInput}
              />
            </label>

            <button onClick={handleUpload} style={styles.button}>
              🚀 Upload
            </button>

            {message && <p style={styles.message}>{message}</p>}
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(to right, #4facfe, #00f2fe)",
    padding: "20px",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
    cursor: "pointer",
  },
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
  fileLabel: {
    display: "block",
    background: "#4facfe",
    color: "white",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
    textAlign: "center",
    width: "100%",
    marginBottom: "15px",
  },
  fileInput: {
    display: "none",
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
  message: {
    marginTop: "15px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
  },
};

export default Admin;

