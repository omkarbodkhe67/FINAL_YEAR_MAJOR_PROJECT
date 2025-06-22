# 🧠 Final Year Major Project - Face Based Attendance System with Report Generation

## 🔰 Project Title

**Face-Based Attendance System with Report Generation**

## 👨‍💻 Developed By:

**Omkar Bodkhe**
Tech Stack: MERN (MongoDB, Express, React, Node), Python, ESP32-CAM, TailwindCSS

---

## 📁 Directory Structure Overview

```
omkarbodkhe67-final_year_major_project/
├── Dashboard/               # Full-stack MERN Dashboard
│   ├── backend/             # Node.js + Express Server
│   └── frontend/            # React + TailwindCSS Frontend
├── ESP_32_FINAL_CODE/       # Code for ESP32-CAM for face capture
└── Python code/             # Python-based Attendance Processing
```

---

## 📌 Project Description

This project is a complete **face-based attendance system** that includes:

* **Real-time face recognition**
* **Automated attendance logging**
* **Admin and student dashboard**
* **Report generation**
* **Event and placement participation modules**

The project integrates **IoT (ESP32-CAM)** for face capture, **Python** for image processing and database interaction, and a **MERN stack dashboard** for interaction and visualization.

---

## 🖥️ Dashboard (MERN Stack)

### 📦 Backend (`Dashboard/backend`)

* **server.js**: Main server entry point using Express.js
* **MongoDB**: Database connection for user data and attendance logs
* **REST APIs** for handling student, teacher, event, and placement data

### 🌐 Frontend (`Dashboard/frontend`)

Built with **React + TailwindCSS + Vite**
Includes:

#### 👤 User Interfaces:

* **ChooseUser.jsx**: Select Student / Teacher / Admin
* **Home.jsx**: Landing page

#### 📚 Student Section (`studentSection/`):

* **AssignmentCard.jsx**: Upload/view assignments
* **EventFormCard.jsx**: Participate in events
* **PlacementDetails.jsx**: Submit placement information

#### 👨‍🏫 Teacher Section:

* **AttendanceRecord.jsx**: View daily attendance
* **AttendancePercentage.jsx**: View attendance stats
* **assignments.jsx**: Manage student assignments
* **ViewEventSubmissions.jsx**: Monitor event participation

#### 🧑‍💼 Admin Section:

* **Admin.jsx**: Admin dashboard
* **admin/StudentData.jsx**: View and manage student details

---

## 📷 ESP32-CAM Module (`ESP_32_FINAL_CODE`)

* **ESP\_32\_FINAL\_CODE.ino**: Arduino sketch for ESP32-CAM to capture face and send data to backend or Firebase

---

## 🐍 Python Module (`Python code/`)

### Files:

* **final.py**: Main script to process captured images and mark attendance
* **db.py**: MongoDB connection handler
* **Attendance.csv**: Attendance log output
* **requirements.txt**: Required Python packages

### Features:

* Uses **OpenCV** and **face\_recognition**
* Compares live face with dataset
* Marks and saves attendance to CSV and MongoDB

---

## ⚙️ Setup Instructions

### 🔧 Backend

```bash
cd Dashboard/backend
npm install
node server.js
```

### 💻 Frontend

```bash
cd Dashboard/frontend
npm install
npm run dev
```

### 🐍 Python (Image Processing)

```bash
cd Python code
pip install -r requirements.txt
python final.py
```

### 🔌 ESP32-CAM

* Flash the `ESP_32_FINAL_CODE.ino` using Arduino IDE
* Connect with your Wi-Fi and adjust `ssid`/`password` in code

---

## 📈 Features Summary

| Feature               | Description                                     |
| --------------------- | ----------------------------------------------- |
| Face Detection        | Using ESP32-CAM and OpenCV                      |
| Attendance Management | Automated marking and storage                   |
| Admin Dashboard       | Manage students, attendance, events             |
| Student Dashboard     | Submit assignments, events, placement info      |
| Teacher Dashboard     | View attendance records and student submissions |
| Reports               | CSV reports of attendance                       |

---

## 🏁 Future Improvements

* OTP-based student login
* Email alerts for attendance
* Improved face recognition using deep learning models

---

## 📬 Contact

**Omkar Bodkhe**
📧 [omkarbodkhe67@gmail.com](mailto:omkarbodkhe67@gmail.com) 
🔗 [LinkedIn](https://linkedin.com/in/omkarbodkhe)

