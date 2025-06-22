import React, { useState } from "react";
import axios from "axios";

// ✅ UploadForm component
const StudentData = ({ studentName, setStudentName, images, setImages, setMessage }) => {
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

      <button onClick={handleUpload} style={styles.button}>🚀 Upload</button>
    </>
  );
};
export default StudentData